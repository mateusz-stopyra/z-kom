({
    goToProduct: function (component, event, helper) {
        event.stopPropagation();
        const selectedItem = event.currentTarget;
        const recId = selectedItem.dataset.value;
        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': recId,
            'slideDevName': 'related'
        });
        navEvt.fire();
    },
})