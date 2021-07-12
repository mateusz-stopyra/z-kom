({
    onButtonPressed: function(component, event, helper) {
        let actionClicked = event.getSource().getLocalId();
        let navigate = component.get('v.navigateFlow');

        const addProducts = component.get('c.addProductsToOrderProduct');
        addProducts.setParams({
            opportunityId : component.get('v.opportunityId'),
            orderId : component.get('v.orderId')
        });

        addProducts.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {

                navigate(actionClicked);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(addProducts);
        
    },
    
    init : function (component, event, helper) {
        helper.handleInit(component, event);
    }

})