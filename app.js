// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // Create new ID based on last stored ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else
                ID = 0;

            // Create new item based on 'inc' or 'exp' type
            if (type === "exp")
                newItem = new Expense(ID, des, val);
            else if (type === "inc")
                newItem = new Income(ID, des, val);



            // Push it into our data structure    
            data.allItems[type].push(newItem);

            return newItem;
            // Return the new element

        },
        testing: function () {
            console.log(data);
        },


        //Calculating budget
        calculateBudget: function (type, value) {

            var values = {
                income: (document.getElementsByClassName("budget__income--value")[0].innerText),
                expenses: document.getElementsByClassName("budget__expenses--value")[0].innerText
            }

            var incomeValue = parseFloat((values.income).substr(1, values.income.length).replace(/\,/g, ''));
            var expensesValue = parseFloat((values.expenses).substr(1, values.expenses.length).replace(/\,/g, ''));
            if (type == "inc") {
                return (parseFloat(incomeValue + parseFloat(value)).toFixed(2))
            } else {
                return (parseFloat(expensesValue + parseFloat(value)).toFixed(2))
            }
        },


        //Calculate Percentage
        calculatePercentage: function (value) {
            var values = {
                income: document.getElementsByClassName("budget__income--value")[0].innerText
            }
            var incomeValue = parseFloat((values.income).substr(1, values.income.length).replace(/\,/g, ''));
            var percentage = Math.round((value * 100) / incomeValue);
            return percentage;
        }
    }
})();

// UI CONTROLLER
var uiController = (function () {

    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeParentClass: ".income__list",
        incomeExpensesClass: ".expenses__list",
        newClass: "item clearfix",
        inputDesc: "item__description",
        valueClass: "right clearfix",
        inputValDiv: "item__value",
        inputDelete: "item__delete",
        btnClass: "item__delete--btn"
    };


    // for creating DOM Elements
    var elements = {
        create: function () {
            return document.createElement("div")
        },
        newDescription: function () {
            return document.createElement("div")
        },
        newValueDiv: function () {
            return document.createElement("div")
        },
        newValueSubDiv: function () {
            return document.createElement("div")
        },
        newDel: function () {
            return document.createElement("div")
        },
        newBtn: function () {
            return document.createElement("button")
        }

    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description: document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value: document.querySelector(domStrings.inputValue).value
            }

        },
        getDOMstrings: function () {
            return domStrings;
        },


        //displaying List
        display: function (type, description, value) {

            if (type == "inc") {
                var parentClass = "income__list";
                var symbol = "+";
            } else {
                var parentClass = "expenses__list";
                var symbol = "-"
            }

            var methods = { //calling DOM-elements-creating functions
                newElement: elements.create(),
                descDiv: elements.newDescription(),
                valDiv: elements.newValueDiv(),
                newvalSubDiv: elements.newValueSubDiv(),
                deleteDiv: elements.newDel(),
                btnDiv: elements.newBtn()
            }

            methods.newElement.setAttribute("class", domStrings.newClass); //seeting attributes
            methods.descDiv.setAttribute("class", domStrings.inputDesc);
            methods.valDiv.setAttribute("class", domStrings.valueClass);
            methods.newvalSubDiv.setAttribute("class", domStrings.inputValDiv);
            methods.deleteDiv.setAttribute("class", domStrings.inputDelete);
            methods.btnDiv.setAttribute("class", domStrings.btnClass);


            (document.getElementsByClassName(parentClass)[0]).appendChild(methods.newElement); //appending new elements to their Parent elements
            methods.newElement.appendChild(methods.descDiv);
            methods.newElement.appendChild(methods.valDiv);
            methods.valDiv.appendChild(methods.newvalSubDiv);
            if (type != "inc") {
                var percentage = document.createElement("div");
                percentage.setAttribute("class", "item__percentage");
                methods.valDiv.appendChild(percentage);
            }
            methods.valDiv.appendChild(methods.deleteDiv);
            methods.deleteDiv.appendChild(methods.btnDiv);


            methods.descDiv.innerText = description; //description
            methods.newvalSubDiv.innerText = symbol + value; //value
            methods.btnDiv.innerHTML = `<i class="ion-ios-close-outline"></i>`;
            percentage.innerHTML = budgetController.calculatePercentage(value) + "%";


        },

        //Update
        incomeExpenses: function (type, budget) {
            if (type == "inc") {
                document.getElementsByClassName("budget__income--value")[0].innerText = "+" + budget;
            } else document.getElementsByClassName("budget__expenses--value")[0].innerText = "-" + budget;
        },

        //Display Budget
        displayBudget: function () {
            let values = {
                income: document.getElementsByClassName("budget__income--value")[0].innerText,
                expenses: document.getElementsByClassName("budget__expenses--value")[0].innerText
            }
            values.income = parseFloat(values.income.substr(1, values.income.length).replace(/\,/g, ''));
            values.expenses = parseFloat(values.expenses.substr(1, values.expenses.length).replace(/\,/g, ''));
            var f = parseFloat(values.income - values.expenses).toFixed(2);
            if (f > 0) document.getElementsByClassName("budget__value")[0].innerText = "+" + f;
            else document.getElementsByClassName("budget__value")[0].innerText = f;
        }
    }

})();

// APP CONTROLLER
var appController = (function (budgetCtrl, uiCtrl) {

    var setUpEventListeners = function () {
        var DOM = uiCtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        var input, newItem, budget;

        // 1. Get the field input data
        input = uiCtrl.getInput();


        // 2. Add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        uiCtrl.display(input.type, input.description, input.value);

        // 4. Calculate the budget
        budget = budgetCtrl.calculateBudget(input.type, input.value);
        budgetCtrl.calculatePercentage(input.value);



        // 5. Need to display the budget on UI
        uiCtrl.incomeExpenses(input.type, budget)
        uiCtrl.displayBudget(budget);

    }

    return {
        init: function () {
            console.log("Application has Started");
            setUpEventListeners();
        }
    }

})(budgetController, uiController);

appController.init();