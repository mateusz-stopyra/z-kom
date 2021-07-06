({
    create : function (component, event) {
        let action = component.get('c.netPriceBook');
        action.setParams({
            'name' : component.get('v.name'),
            'discountValue' : component.get('v.percent'),
            'products' : component.get('v.selectedProducts')
        });
        action.setCallback(this, function (response) {
            if(response.getState() === 'SUCCESS'){
                let appEvent = $A.get('e.c:ZK_ReInit');
                appEvent.fire();
            }
            if(response.getState() === 'ERROR'){
                alert(response);
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