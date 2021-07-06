({
    doInit : function (component, event, helper) {
        helper.getphoto;
        helper.getprice;
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