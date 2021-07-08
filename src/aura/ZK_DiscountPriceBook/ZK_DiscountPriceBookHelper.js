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
                let info = $A.get("$Label.c.ZK_DeletedDiscount");
                let success = $A.get("$Label.c.DS_OperationSucesfull");
                toastEvent.setParams({
                    "title": success,
                    'duration':' 5000',
                    'type': 'warning',
                    'mode': 'pester',
                    "message": info
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
                let info = $A.get("$Label.c.ZK_ActivateDiscount");
                let success = $A.get("$Label.c.DS_OperationSucesfull");
                toastEvent.setParams({
                    "title": success,
                    'duration':' 5000',
                    'type': 'success',
                    'mode': 'pester',
                    "message": info
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
                let success = $A.get("$Label.c.DS_OperationSucesfull");
                let info = $A.get("$Label.c.ZK_DisableDiscount");
                toastEvent.setParams({
                    "title": success,
                    'duration':' 5000',
                    'type': 'warning',
                    'mode': 'pester',
                    "message": info
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
                let info = $A.get("$Label.c.ZK_DiscountView");
                component.find('discountView').showCustomModal({
                    header : info,
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