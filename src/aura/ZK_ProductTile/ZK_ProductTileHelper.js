({
    handleProductClick : function (component, productId) {
        const id = component.get('v.product').Id;

        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': id,
            'slideDevName': 'related'
        });
        navEvt.fire();
    }
})