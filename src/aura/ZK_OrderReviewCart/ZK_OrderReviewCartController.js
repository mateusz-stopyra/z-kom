({
    addProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, 1);
    },

    takeProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, -1);
    },

    recalculateTotalPrice: function (component, event, helper) {
        helper.determineTotalPrice(component);
    },

    removeProduct: function(component, event, helper) {
        const productId = event.target.id;
        helper.removeProduct(component, productId);
    },

    init : function (component) {
        component.set('v.products', JSON.parse(localStorage.getItem('products')));

        let totalPrice = 0;
        const products2 = component.get('v.products');
        for (let p in products2) {
            const product = products2[p];
            totalPrice += product.Amount * product.UnitPrice;
        }
        component.set('v.totalPrice', totalPrice);
    },

    onButtonPressed: function(component, event, helper) {
        helper.handleAddProductsToOpportunity(component, event);
        let actionClicked = event.getSource().getLocalId();
        let navigate = component.get('v.navigateFlow');
        navigate(actionClicked);
    },

    goToProduct: function (component, event, helper) {
        event.stopPropagation();
        const selectedItem = event.currentTarget;
        const recId = selectedItem.dataset.value;
        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': recId,
            'slideDevName': 'related'
        });
        navEvt.fire();
    },

})