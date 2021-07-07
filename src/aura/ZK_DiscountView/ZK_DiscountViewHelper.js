({
    getPriceBookEntries : function (component, event) {
        let action = component.get('c.getPricebookEntries');
        action.setParams({
            'priceBookId' : component.get('v.priceBook.Id')
        });
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.priceBookEntries', temp);
            }else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    closeModal : function (component, event) {
        component.find('discountView').notifyClose();
    }

})