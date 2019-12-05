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
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // Create new ID based on last stored ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else ID = 0;

            // Create new item based on 'inc' or 'exp' type
            if (type === "exp") newItem = new Expense(ID, des, val);
            else if (type === "inc") newItem = new Income(ID, des, val);

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },
        testing: function () {
            console.log(data);
        },

        //Calculate Total Income and Expenses
        calculateBudget: function (value, type) {
            value = +parseFloat(value).toFixed(2);
            var finalincome, finalexp;

            if (type == "inc") {
                var income = document.getElementsByClassName("budget__income--value")[0].innerText;
                income = parseFloat(income.substr(1, income.length).replace(/\,/g, ''));
                finalincome = +parseFloat(value + income).toFixed(2);
            } else {
                var expenses = document.getElementsByClassName("budget__expenses--value")[0].innerText;
                expenses = parseFloat(expenses.substr(1, expenses.length).replace(/\,/g, ''));
                finalexp = +parseFloat(value + expenses).toFixed(2);
            }
            return type == "inc" ? finalincome : finalexp;

        },


        //Calculate Final Budget
        finalBudget: function () {
            let finalIncome = document.getElementsByClassName("budget__income--value")[0].innerText;
            finalIncome = parseFloat(finalIncome.substr(1, finalIncome.length).replace(/\,/g, ''));

            let finalExpenses = document.getElementsByClassName("budget__expenses--value")[0].innerText;
            finalExpenses = parseFloat(finalExpenses.substr(1, finalExpenses.length).replace(/\,/g, ''));
            return +parseFloat(finalIncome - finalExpenses).toFixed(2)
        },


        //Calculate Percentage
        calculatePercentage: function (value) {
            var income = document.getElementsByClassName("budget__income--value")[0].innerText;
            income = parseFloat(income.substr(1, income.length).replace(/\,/g, ''));
            finalexp = +parseFloat(value + income).toFixed(2);
            var percentage = parseInt((value * 100) / income);
            return percentage;
        }
    };
})();

// UI CONTROLLER
var uiController = (function () {
    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list"
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description: document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value: document.querySelector(domStrings.inputValue).value
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element, percentage;
            // Create HTML string with placeholder text
            if (type === "inc") {
                element = domStrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = domStrings.expenseContainer;
                html =
                    '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                percentage = budgetController.calculatePercentage(obj.value);
                console.log(percentage);
            }

            // Replace placeholder text with some actual data
            newHtml = html
                .replace("%id%", obj.id)
                .replace("%description%", obj.description)
                .replace("%value%", obj.value).replace("21", percentage);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        getDOMstrings: function () {
            return domStrings;
        },


        //Update Total Income and Expenses
        updateUI: function (type, budget) {
            if (type == "inc") {
                document.getElementsByClassName("budget__income--value")[0].innerText = "+" + budget;
            } else {
                document.getElementsByClassName("budget__expenses--value")[0].innerText = "-" + budget;
            }
            var finalValue = budgetController.finalBudget();
            document.getElementsByClassName("budget__value")[0].innerHTML = finalValue;
        }
    };
})();

// APP CONTROLLER
var appController = (function (budgetCtrl, uiCtrl) {
    var setUpEventListeners = function () {
        var DOM = uiCtrl.getDOMstrings();

        document
            .querySelector(DOM.inputButton)
            .addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem, budget;

        // 1. Get the field input data
        input = uiCtrl.getInput();

        // 2. Add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        uiCtrl.addListItem(newItem, input.type);

        // 4. Calculate the budget
        budget = budgetCtrl.calculateBudget(newItem.value, input.type);

        // 5. Need to display the budget on UI
        uiCtrl.updateUI(input.type, budget);
    };

    return {
        init: function () {
            console.log("Application has Started");
            setUpEventListeners();
        }
    };
})(budgetController, uiController);

appController.init();