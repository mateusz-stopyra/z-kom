({
    showAddressModal : function (component, event, helper) {
        component.set('v.showDeliveryAddress',event.detail.checked);
    },

    onButtonPressed: function(cmp, event, helper) {
        let actionClicked = event.getSource().getLocalId();
        let navigate = cmp.get('v.navigateFlow');
        navigate(actionClicked);
    }
})