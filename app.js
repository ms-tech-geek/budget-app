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
    document.querySelector('.add_btn').addEventListener('click',function(){
        console.log("Button Clicked");
    });
})(budgetController,uiController);