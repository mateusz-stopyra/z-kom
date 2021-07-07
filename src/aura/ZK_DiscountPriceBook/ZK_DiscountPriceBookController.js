({
    toggleActive : function (component, event, helper) {
        helper.toggleActive(component, event);
    },

    showDiscount : function (component, event, helper) {
        helper.showViewModal(component, event);
    },

    reInit : function (component, event, helper) {
        helper.reInit(component, event);
    },

    removeDiscount : function (component, event, helper) {
        helper.deleteDiscount(component, event);
    }
})