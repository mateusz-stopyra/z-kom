({
    onButtonPressed: function(component, event, helper) {
        helper.handleAddProductsToOrder(component, event);
    },
    
    init : function (component, event, helper) {
        helper.handleInit(component, event);
    }
})