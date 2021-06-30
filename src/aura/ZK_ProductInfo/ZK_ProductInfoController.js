({
    doInit : function (component, event, helper) {
        const id = component.get('v.recordId');
        helper.loadRecord(component, id);
    },

    doSaveRecord : function (component, event, helper) {
        helper.saveRecord(component);
    }

})