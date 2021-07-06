({
    onLoad : function(component) {
        const action = component.get('c.getAllProducts');
        action.setCallback(this,function(response) {
            const state = response.getState();
            if(state==='SUCCESS'){
                const temp=response.getReturnValue();
                component.set('v.products',temp);
            }
        });
        $A.enqueueAction(action);
    },
})