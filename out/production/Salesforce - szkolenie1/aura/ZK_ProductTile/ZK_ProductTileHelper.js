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
})