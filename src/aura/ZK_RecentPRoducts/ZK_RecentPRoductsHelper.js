({
    fetchRecentProducts: function (component) {
        const action = component.get('c.getRecentlyViewed');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());
            }
            else{
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(action);
    },
}); 