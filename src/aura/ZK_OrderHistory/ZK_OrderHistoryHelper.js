({
    handleOrderHistory: function (component) {
        const action = component.get('c.getOrderHistory');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.orders', res.getReturnValue());
                console.log(component.get('v.orders'));
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(action);
    }
})