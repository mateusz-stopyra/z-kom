({
    handleProductClick : function (component, productId) {
        const id = component.get('v.product').Id;

        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': id,
            'slideDevName': 'related'
        });
        navEvt.fire();
    },

    fetchCurrentProfile: function(component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.currentProfile', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    getPrice : function (component, event) {
        let action = component.get('c.getProductPrice');
        action.setParams({
            'productId' : component.get('v.product.Id')
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.price',temp[0].UnitPrice);
                if (temp.length > 1) {
                    component.set('v.defaultPrice', temp[temp.length - 1].UnitPrice);
                }
            }
        });
        $A.enqueueAction(action);
    },

})