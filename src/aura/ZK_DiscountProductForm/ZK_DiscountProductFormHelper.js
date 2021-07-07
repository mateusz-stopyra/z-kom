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
                toastEvent.setParams({
                    "title": "Success!",
                    'duration':' 5000',
                    'type': 'success',
                    'mode': 'pester',
                    "message": "Promotion has been saved successfully."
                });
                toastEvent.fire();
            }
            if(response.getState() === 'ERROR'){
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Warning!",
                    'duration':' 5000',
                    'type': 'warning',
                    'mode': 'pester',
                    "message": "An error has occured."
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