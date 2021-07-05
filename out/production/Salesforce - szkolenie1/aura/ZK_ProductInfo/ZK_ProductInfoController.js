({
    doInit : function (component, event, helper) {
        const id = component.get('v.recordId');
        helper.loadRecord(component, id);
    },

    doSaveRecord : function (component, event, helper) {
        helper.saveRecord(component);
    },

    doCheck : function  (component, event, helper) {
        console.log(JSON.stringify(event.detail));
    }

})