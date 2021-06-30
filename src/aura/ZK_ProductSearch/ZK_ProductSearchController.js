({
    onFormSubmit : function(component, event, helper) {
        const searchQuery = event.getParam('searchQuery');
        const mediaSearchResultsCmp = component.find('mediaSearchResultsCmp');
        if(mediaSearchResultsCmp){
            mediaSearchResultsCmp.updateSearchQuery(searchQuery);
        }
        const cmpTarget = component.find('card');
        $A.util.removeClass(cmpTarget, 'slds-hide');
    },
})