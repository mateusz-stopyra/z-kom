({
    onSearch : function(component, searchQueryParsed) {
        const action = component.get('c.getSearchResults');
        action.setParams({
            'searchQuery':searchQueryParsed.searchQuery,
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.searchResponse',temp);
            }else{
                alert(state);
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
})