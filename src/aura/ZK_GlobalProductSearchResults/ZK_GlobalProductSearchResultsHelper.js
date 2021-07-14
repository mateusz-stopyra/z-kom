({
    onSearch : function(component, searchQueryParsed) {

        console.log(searchQueryParsed);
        const action = component.get('c.getSearchResults');
        action.setParams({
            'searchQuery':searchQueryParsed.searchQuery,
        });
        console.log(action);

        action.setCallback(this,function(response) {
            const state = response.getState();
            console.log(state);
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.searchResponse',temp);
                console.log(component.get('v.searchResponse'));
            }else{
                alert(state);
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
})