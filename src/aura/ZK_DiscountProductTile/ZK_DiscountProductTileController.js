({
    doInit : function (component, event, helper) {
        helper.getPrice(component, event);
        // component.set('v.percentThis',5);
    },

    tileClick : function (component, event, helper) {
        if(!component.get('v.lock')){
            helper.toggleProduct(component, event);
        }
    },

    reInit : function (component, event, helper) {
        helper.reInit(component, event);
    }

})