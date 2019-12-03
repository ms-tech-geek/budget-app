// BUDGET CONTROLLER
var budgetController = (function () {
    // Some code
    var data = [];
    console.log(data);
    return {
        getData: function (input) {
            data.push(input)
            console.log(data);

        },

        calculateBudget: function (value, type) {
            if (type == "inc") {
                var total = document.getElementsByClassName("budget__income--value")[0].innerHTML;
                var sum = parseFloat(total.substr(1, total.length).replace(/\,/g, ''));
                value = parseFloat(value);
                document.getElementsByClassName("budget__income--value")[0].innerHTML = `+ ${sum + value}`
            } else {
                var total = document.getElementsByClassName("budget__expenses--value")[0].innerHTML;
                console.log("total" + total)
                var sum = (parseFloat(total.substr(1, total.length).replace(/\,/g, '')));
                value = parseFloat(value);
                console.log("sum -- " + sum + "    Value -- " + value + "  Total -- " + (sum + value))
                document.getElementsByClassName("budget__expenses--value")[0].innerHTML = `- ${sum + value}`
            }

        },
        calculatePercentage: function () {
            let income = document.getElementsByClassName("budget__income--value")[0].innerHTML;
            let expenses = document.getElementsByClassName("budget__expenses--value")[0].innerHTML;
            income = parseFloat(income.substr(1, income.length).replace(/\,/g, '')).toFixed(2);
            expenses = parseFloat(expenses.substr(1, expenses.length).replace(/\,/g, '')).toFixed(2);
            let percentage = Math.round((expenses * 100) / income);
            return percentage;

        }
    }
})();

// UI CONTROLLER
var uiController = (function () {

    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value"
    };



    return {
        getInput: function () {
            console.log(document.querySelector(domStrings.inputType).value);
            console.log(document.querySelector(domStrings.inputDescription).value)
            console.log(document.querySelector(domStrings.inputValue).value);
            return {
                type: document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description: document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value: document.querySelector(domStrings.inputValue).value
            }

        },
        displayData: function (input) {
            //console.log(input.type + input.description + input.value);
            var newElement = document.createElement("div");
            var subDivDescription = document.createElement("div");
            var subDivValue = document.createElement("div");
            var value = document.createElement("div");

            var buttonDiv = document.createElement("div");
            var btn = document.createElement("button");
            if (input.type == "inc") {
                var parentClass = "income__list";
                var symbol = "+";

            } else {
                var parentClass = "expenses__list";
                var symbol = "-";
                var percentage = document.createElement("div");
                percentage.innerHTML = budgetController.calculatePercentage() + "%";
                percentage.setAttribute("class", "item__percentage");

            }

            var classes = {
                childCount: document.getElementsByClassName(parentClass)[0].childElementCount,
                descriptionClass: "item__description",
                valueClass: "right clearfix",
                valueSubClass: "item__value",
                deleteClass: "item__delete",
                btnClass: "item__delete--btn",
                percentClass: "item__percentage"
            }

            newElement.setAttribute("class", "item clearfix");
            newElement.setAttribute("id", `income-${classes.childCount}`);
            subDivDescription.setAttribute("class", classes.descriptionClass);
            subDivValue.setAttribute("class", classes.valueClass);
            value.setAttribute("class", classes.valueSubClass);
            buttonDiv.setAttribute("class", classes.deleteClass);
            btn.setAttribute("class", classes.btnClass);

            subDivDescription.innerText += input.description;
            value.innerText += symbol + input.value + ".00";
            btn.innerHTML = ' <i class="ion-ios-close-outline"></i> ';

            document.getElementsByClassName(parentClass)[0].appendChild(newElement); //New Element added to the list
            newElement.appendChild(subDivDescription); //item description appended
            newElement.appendChild(subDivValue); //Value Element
            subDivValue.appendChild(value); //Value added
            if (input.type != "inc") {
                subDivValue.appendChild(percentage);
            }

            buttonDiv.appendChild(btn);
            subDivValue.appendChild(buttonDiv);

        },

        displayBudget: function () {
            var income = (document.getElementsByClassName("budget__income--value")[0].innerHTML);
            var expenses = (document.getElementsByClassName("budget__expenses--value")[0].innerHTML);
            income = parseFloat(income.substr(1, income.length).replace(/\,/g, '')).toFixed(2);
            expenses = parseFloat(expenses.substr(1, income.length).replace(/\,/g, '')).toFixed(2);
            var sums = parseFloat(income - expenses).toFixed(2);
            document.getElementsByClassName("budget__value")[0].innerHTML = sums;
        }
    }
})();

// APP CONTROLLER
var appController = (function (budgetCtrl, uiCtrl) {

    var ctrlAddItem = function () {
        // 1. Get the field input data
        var input = uiCtrl.getInput();
        console.log(input);
        // 2. Add the item to budget controller
        budgetCtrl.getData(input);
        // 3. Add the item to the UI
        uiCtrl.displayData(input);
        // 4. Calculate the budget
        budgetCtrl.calculateBudget(input.value, input.type);
        // 5. Need to display the budget on UI
        uiCtrl.displayBudget();
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, uiController);