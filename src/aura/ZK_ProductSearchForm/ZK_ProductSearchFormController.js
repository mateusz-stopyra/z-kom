({
    onFormSubmit : function(component,event) {

        const searchQuery = component.find("queryInputField").get("v.value");
        const formSubmit = component.getEvent("formSubmit");

        formSubmit.setParams({
            searchQuery : searchQuery
        });

        formSubmit.fire();
    },
})