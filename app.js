// BUDGET CONTROLLER
var budgetController = (function(){
    // Some code
})();

// UI CONTROLLER
var uiController =(function(){
    
    var domStrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value"
    };

    return {
        getInput : function(){
            return {
                type : document.querySelector(domStrings.inputType).value, // Will be either INC or EXP
                description : document.querySelector(inputDescription.inputDescription).value, // Description of transaction
                value : document.querySelector(domStrings.inputValue).value
            }

        }
    }

})();

// APP CONTROLLER
var appController = (function(budgetCtrl,uiCtrl){  
    
    var ctrlAddItem = function (){
        // 1. Get the field input data
        var input = uiCtrl.getInput();
        console.log(input);
        // 2. Add the item to budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Need to display the budget on UI

    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener("keypress",function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController,uiController);