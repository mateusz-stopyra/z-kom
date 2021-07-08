({
    doInit : function (component, event, helper) {
        helper.getPriceBookEntries(component, event);
    },

    closeModal : function (component, event, helper) {
        helper.closeModal(component, event);
    }
})