// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(element => {
      sum += element.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1,
    expensesPercentage: 0
  };

  return {
    addItem: function(type, des, val) {
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

    calculateBudget: function() {
      // Calculate total income and expense
      calculateTotal("exp");
      calculateTotal("inc");

      // Calculate the budget : income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we have spent
      if (data.totals.inc > 0)
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.percentage = -1;
    },

    calculatePercentage: function(type, value) {
      data.expensesPercentage = Math.round((value * 100) / data.totals.inc);
      var id = data.allItems["exp"][data.allItems["exp"].length - 1].id;
      return [data.expensesPercentage, id];
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
})();

// UI CONTROLLER
var uiController = (function() {
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    itemPercentage: "item__percentage"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
        description: document.querySelector(domStrings.inputDescription).value, // Description of transaction
        value: parseFloat(document.querySelector(domStrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === "inc") {
        element = domStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = domStrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace placeholder text with some actual data
      newHtml = html
        .replace("%id%", obj.id)
        .replace("%description%", obj.description)
        .replace("%value%", obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        domStrings.inputDescription + ", " + domStrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(current => {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(domStrings.expenseLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0)
        document.querySelector(domStrings.percentageLabel).textContent =
          obj.percentage;
      else
        document.querySelector(domStrings.percentageLabel).textContent = "---";
    },

    //Calculate Percentage
    updatePercentage: function(value, id) {
      document.getElementsByClassName(domStrings.itemPercentage)[
        id + 2
      ].innerHTML = value + "%";
    },

    getDOMstrings: function() {
      return domStrings;
    }
  };
})();

// APP CONTROLLER
var appController = (function(budgetCtrl, uiCtrl) {
  var setUpEventListeners = function() {
    var DOM = uiCtrl.getDOMstrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function(type, value) {
    var budget;

    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    budget = budgetCtrl.getBudget();

    // Display the budget on UI
    uiCtrl.displayBudget(budget);
    uiCtrl.updatePercentage(...budgetCtrl.calculatePercentage(type, value));
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get the field input data
    input = uiCtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      uiCtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      uiCtrl.clearFields();

      // 5. Calculate and update the budget
      updateBudget(input.type, input.value);
    }
  };

  return {
    init: function() {
      console.log("Application has Started");
      uiCtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      setUpEventListeners();
    }
  };
})(budgetController, uiController);

appController.init();
