// BUDGET CONTROLLER
var budgetController = (function(){
    // Some code
})();

// UI CONTROLLER
var uiController =(function(){
    // Some code
})();

// APP CONTROLLER
var appController = (function(budgetCtrl,uiCtrl){  
    document.querySelector('.add__btn').addEventListener('click',function(){
        // 1. Get the field input data

        // 2. Add the item to budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Need to display the budget on UI
    });

    document.addEventListener("keypress",function(event){
        if(event.keyCode === 13 || event.which === 13){
            console.log("Enter was pressed");
        }
    });

})(budgetController,uiController);