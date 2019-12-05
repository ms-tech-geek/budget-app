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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
<<<<<<< HEAD
        }
    };
=======
        },
        budget : 0,
        percentage : -1   
    }
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d

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
<<<<<<< HEAD
        testing: function () {
=======

        calculateBudget: function(){
            // Calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we have spent
            if(data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else
                data.percentage = -1;
        },

        getBudget: function(){
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            }
        },

        testing: function(){
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d
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
<<<<<<< HEAD
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list"
=======
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton : ".add__btn",
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel : ".budget__value",
        incomeLabel : ".budget__income--value",
        expenseLabel : ".budget__expenses--value",
        percentageLabel : ".budget__expenses--percentage"
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d
    };

    return {
        getInput: function () {
            return {
<<<<<<< HEAD
                type: document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description: document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value: document.querySelector(domStrings.inputValue).value
            };
=======
                type : document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description : document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value : parseFloat(document.querySelector(domStrings.inputValue).value)
            }

>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d
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

<<<<<<< HEAD
        getDOMstrings: function () {
=======
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(domStrings.inputDescription + ", " + domStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach( current => {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj){

            document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(domStrings.expenseLabel).textContent = obj.totalExp;
    
            if(obj.percentage > 0)
                document.querySelector(domStrings.percentageLabel).textContent = obj.percentage;
            else
            document.querySelector(domStrings.percentageLabel).textContent = '---';
        },

        getDOMstrings: function(){
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d
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

<<<<<<< HEAD
=======
    var updateBudget = function(){
        var budget;

        // Calculate the budget
        budgetCtrl.calculateBudget();

        // Return the budget
        budget = budgetCtrl.getBudget();

        // Display the budget on UI
        uiCtrl.displayBudget(budget);
    };

    var ctrlAddItem = function (){
        var input, newItem;
        
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d
        // 1. Get the field input data
        input = uiCtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0)
        {
            // 2. Add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            uiCtrl.addListItem(newItem, input.type);

<<<<<<< HEAD
        // 4. Calculate the budget
        budget = budgetCtrl.calculateBudget(newItem.value, input.type);

        // 5. Need to display the budget on UI
        uiCtrl.updateUI(input.type, budget);
    };
=======
            // 4. Clear the fields
            uiCtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();
        }
    }
>>>>>>> 9108d73ee1545ea3796b17ffef84598ae4e4123d

    return {
        init: function () {
            console.log("Application has Started");
            uiCtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : 0
            })
            setUpEventListeners();
        }
    };
})(budgetController, uiController);

appController.init();