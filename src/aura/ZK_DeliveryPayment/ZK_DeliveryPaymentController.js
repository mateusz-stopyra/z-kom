({
    showAddressModal : function (component, event, helper) {
        component.set('v.showDeliveryAddress',event.detail.checked);
    },

    onButtonPressed: function(cmp, event, helper) {
        // Figure out which action was called
        var actionClicked = event.getSource().getLocalId();
        // Fire that action
        var navigate = cmp.get('v.navigateFlow');
        navigate(actionClicked);
        // helper.assignData(component, event);
    }
})