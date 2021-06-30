({
    onSearch : function(component, searchQuery) {

        const action = component.get('c.getSearchResults');
        action.setParams({
            'searchQuery':searchQuery,
        });

        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.searchResponse',temp);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    onGearSelect : function(component, searchQuery) {

        const action = component.get('c.getGearTypeSearchResults');
        action.setParams({
            'searchQuery':searchQuery,
        });

        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.searchResponse',temp);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
})