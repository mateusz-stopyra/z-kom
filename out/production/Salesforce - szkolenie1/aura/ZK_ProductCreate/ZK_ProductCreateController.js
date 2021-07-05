({
    requestRecordSave : function(component, event, helper){
        const infoForm = component.find('productInformationForm');
        infoForm.save();
    },

    onProductSaved : function (component, event, helper) {
        component.set('v.currentStep','2');
        const id = event.getParam('productId');
        component.set('v.productId', id);
    },

    requestSelectDisplayImage : function (component, event, helper) {
        component.set('v.currentStep', '3');
        const id = component.get('v.productId');
    },

    closeDialog : function (component) {
        const id = component.get('v.productId');

        let viewRecordEvent = $A.get("e.force:navigateToURL");
        viewRecordEvent.setParams({
            "url": "/" + id
        });
        viewRecordEvent.fire();

        component.find('overlayLib').notifyClose();
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            'duration':' 5000',
            'type': 'success',
            'mode': 'pester',
            "message": "Product has been saved successfully."
        });
        toastEvent.fire();


    }



})