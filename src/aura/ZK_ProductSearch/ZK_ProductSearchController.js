({
    onFormSubmit : function(component, event, helper) {
        const searchQuery = event.getParam('searchQuery');
        const mediaSearchResultsCmp = component.find('mediaSearchResultsCmp');
        helper.handleFormSubmit(component,searchQuery,mediaSearchResultsCmp);
    },

    onGearSubmit : function(component, event, helper) {
        const searchQuery = event.getParam('gearSelect');
        const mediaSearchResultsCmp = component.find('mediaSearchResultsCmp');
        helper.handleGearSubmit(component,searchQuery,mediaSearchResultsCmp);
    },
})