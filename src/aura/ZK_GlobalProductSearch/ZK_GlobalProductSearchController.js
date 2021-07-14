({
    onFormSubmit : function(component,event, helper) {

        const searchQuery = component.find("queryInputField").get("v.value");
        const formSubmit = component.getEvent("formSubmit");

        const formData = {
            searchQuery : searchQuery
        };


        helper.navigateToProductsSearchPage(component, formData);
    },
})