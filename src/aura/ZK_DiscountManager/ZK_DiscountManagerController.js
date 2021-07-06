({
    doInit: function (component, event, helper) {
        helper.onLoad(component);
    },

    onFormSubmit: function (component, event) {
        const searchQuery = component.find("queryInputField").get("v.value");
        const formSubmit = component.getEvent("formSubmit");
        formSubmit.setParams({
            searchQuery: searchQuery
        });
        formSubmit.fire();
    },

    onProductClick : function(component, event, helper) {
        const productId = event.currentTarget.dataset.index;
    },


})