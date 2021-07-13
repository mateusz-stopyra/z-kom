({
    handleInit : function (component, event) {
        const products = component.get('c.getProductsFromOrderProduct');
        products.setParams({
            opportunityId : component.get('v.opportunityId'),
        });
        products.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.products',res.getReturnValue());
                let totalPrice = 0;
                const products = component.get('v.products');
                for (let p of products) {
                    totalPrice += p.Quantity * p.UnitPrice;
                    console.log(p.image);
                }
                component.set('v.totalPrice', totalPrice);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(products);
    },

    handleAddProductsToOrder : function (component, event) {
        let actionClicked = event.getSource().getLocalId();
        let navigate = component.get('v.navigateFlow');

        const addProducts = component.get('c.addProductsToOrderProduct');
        addProducts.setParams({
            opportunityId : component.get('v.opportunityId'),
            orderId : component.get('v.orderId')
        });

        addProducts.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                let appEvent = $A.get("e.c:ZK_ClearBasket");
                appEvent.fire();
                navigate(actionClicked);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(addProducts);
    }
})