({
    onFormSubmit : function(component,event) {
        const searchQuery = component.find("queryInputField").get("v.value");
        const formSubmit = component.getEvent("formSubmit");
        formSubmit.setParams({
            searchQuery : searchQuery
        });
        formSubmit.fire();
    },

    onGearTypeSubmit : function (component, event) {
        component.set('v.searchQuery','');
        const formSubmit = component.getEvent("gearSelect");
        const gear = event.getSource().get('v.value')
        formSubmit.setParams({
            gearSelect : gear
        });
        formSubmit.fire();
    }
})