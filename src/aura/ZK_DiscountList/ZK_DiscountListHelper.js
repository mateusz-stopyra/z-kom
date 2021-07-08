({
    getPriceBooks : function (component, event) {
        let action = component.get('c.getPriceBooks');
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.priceBooks',temp);
            }else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    reInit : function (component, event) {
        component.set('v.selectedProducts', {});
        component.set('v.percent', 5);
        component.set('v.name', '');
    },
})