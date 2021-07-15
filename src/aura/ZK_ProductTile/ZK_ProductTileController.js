({
    onProductClick : function(component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.handleProductClick(component,productId);
        },

    onProductShop: function (component, event, helper) {
        helper.handleProductShop(component, event);
    },

    doInit: function(component, event, helper) {
        helper.fetchCurrentProfile(component);
        helper.getPrice(component, event);
    },

})