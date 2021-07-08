({
    create : function (component, event) {
        let action = component.get('c.newPriceBook');

        action.setParams({
            'name' : component.get('v.name'),
            'discountValue' : component.get('v.percent'),
            'products' : component.get('v.selectedProducts')
        });
        action.setCallback(this, function (response) {
            if(response.getState() === 'SUCCESS'){
                let appEvent = $A.get('e.c:ZK_ReInit');
                appEvent.fire();
                let toastEvent = $A.get("e.force:showToast");
                let success = $A.get("$Label.c.DS_OperationSucesfull");
                let info = $A.get("$Label.c.ZK_CreateDiscount");
                toastEvent.setParams({
                    "title": success,
                    'duration':' 5000',
                    'type': 'success',
                    'mode': 'pester',
                    "message": info
                });
                toastEvent.fire();
            }
            if(response.getState() === 'ERROR'){
                let toastEvent = $A.get("e.force:showToast");
                let warning = $A.get("$Label.c.ZK_Warning");
                let info = $A.get("$Label.c.ZK_Error");
                toastEvent.setParams({
                    "title": warning,
                    'duration':' 5000',
                    'type': 'warning',
                    'mode': 'pester',
                    "message": info
                });            }
        });
        $A.enqueueAction(action);
    },

    reInit : function (component, event) {
        component.set('v.selectedProducts', {});
        component.set('v.percent', 5);
        component.set('v.name', '');
    },
})