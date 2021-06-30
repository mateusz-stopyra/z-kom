({
    onNewProduct : function (component, event, helper) {
        const productId = event.getParam('productId');
        helper.onCreatedDialog(component, productId);

    }
})