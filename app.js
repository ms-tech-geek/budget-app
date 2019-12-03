// BUDGET CONTROLLER
var budgetController = (function(){
    // Some code
})();

// UI CONTROLLER
var uiController =(function(){
    
    var domStrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton : ".add__btn"
    };

    return {
        getInput : function(){
            return {
                type : document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description : document.querySelector(domStrings.inputDescription).value, // Description of transaction
                value : document.querySelector(domStrings.inputValue).value
            }

        },
        getDOMstrings: function(){
            return domStrings;
        }
    }

})();

// APP CONTROLLER
var appController = (function(budgetCtrl,uiCtrl){  
    
    var setUpEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener("keypress",function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function (){
        // 1. Get the field input data
        var input = uiCtrl.getInput();
        console.log(input);
        // 2. Add the item to budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Need to display the budget on UI

    }

    return {
        init : function(){
            console.log("Application has Started");
            setUpEventListeners();
        }
    }

})(budgetController,uiController);

appController.init();