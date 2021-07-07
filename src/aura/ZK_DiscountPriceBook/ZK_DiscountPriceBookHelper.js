({
    toggleActive : function (component, event) {
        if(component.get('v.priceBook').IsActive){
            this.deActive(component, event);
        }else{
            this.active(component, event);
        }
    },

    deleteDiscount : function(component, event){
        let action = component.get('c.deleteDiscount');
        action.setParams({
            'id' : component.get('v.priceBook').Id
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                let appEvent = $A.get('e.c:ZK_ReInit');
                appEvent.fire();
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    'duration':' 5000',
                    'type': 'success',
                    'mode': 'pester',
                    "message": "You have successfully deleted the discount."
                });
                toastEvent.fire();
            }else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    active : function (component, event) {
        let action = component.get('c.activatePriceBook');
        action.setParams({
            'priceBookId' : component.get('v.priceBook').Id
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.priceBook.IsActive',true);
                let appEvent = $A.get('e.c:ZK_ReInit');
                appEvent.fire();
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    'duration':' 5000',
                    'type': 'success',
                    'mode': 'pester',
                    "message": "You have successfully activated the discount."
                });
                toastEvent.fire();
            }else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    deActive : function (component, event) {
        let action = component.get('c.deactivatePriceBook');
        action.setParams({
            'priceBookId' : component.get('v.priceBook').Id
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.priceBook.IsActive',false);
                let appEvent = $A.get('e.c:ZK_ReInit');
                appEvent.fire();
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    'duration':' 5000',
                    'type': 'warning',
                    'mode': 'pester',
                    "message": "You have disabled the discount."
                });
                toastEvent.fire();
            }else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    showViewModal : function (component, event) {
        $A.createComponent('c:ZK_DiscountView', {'priceBook' : component.get('v.priceBook')}, function (content, status){
            if(status==='SUCCESS'){
                component.find('discountView').showCustomModal({
                    header : 'Discount View',
                    body : content,
                    showCloseButton : true
                })
            }
        })
    },

    reInit : function (component, event) {
        component.set('v.selectedProducts', {});
        component.set('v.percent', 5);
        component.set('v.name', '');
    },

})