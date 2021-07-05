({
    handleFormSubmit : function (component,searchQuery,mediaSearchResultsCmp) {
        if(mediaSearchResultsCmp){
            mediaSearchResultsCmp.updateSearchQuery(searchQuery);
        }
        const cmpTarget = component.find('card');
        $A.util.removeClass(cmpTarget, 'slds-hide');
    },

    handleGearSubmit : function (component,searchQuery,mediaSearchResultsCmp) {
        if(mediaSearchResultsCmp){
            mediaSearchResultsCmp.updateGearSelect(searchQuery);
        }
        const cmpTarget = component.find('card');
        $A.util.removeClass(cmpTarget, 'slds-hide');
    }



})