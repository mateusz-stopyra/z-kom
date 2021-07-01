({
    onProductClick : function(component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.handleProductClick(component,productId);
        }

})