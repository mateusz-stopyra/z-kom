({
    addProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, 1);
    },

    takeProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, -1);
    },

    recalculateTotalPrice: function (component, event, helper) {
        helper.determineTotalPrice(component);
    },

    removeProduct: function(component, event, helper) {
        const productId = event.target.id;
        helper.removeProduct(component, productId);
    },

    init : function (component) {
        component.set('v.products', JSON.parse(localStorage.getItem('products')));

        let totalPrice = 0;
        const products2 = component.get('v.products');
        for (let p in products2) {
            const product = products2[p];
            totalPrice += product.Amount * product.UnitPrice;
        }
        component.set('v.totalPrice', totalPrice);
    },

    onButtonPressed: function(component, event, helper) {
        const addProducts = component.get('c.addProductsToOpportunityLineItem');
        addProducts.setParams({
            products : component.get('v.products'),
            opportunityId : component.get('v.OpportunityId')
        });
        addProducts.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.products',state.getReturnValue());
                let totalPrice = 0;
                const products = component.get('v.products');
                console.log(products);
                for (let p of products) {
                    // const product = products[p];
                    console.log(p);
                    console.log(p.Amount);
                    console.log(p.UnitPrice);
                    totalPrice += p.Amount * p.UnitPrice;
                    console.log(totalPrice);
                }
                component.set('v.totalPrice', totalPrice);
                console.log(component.get('v.totalPrice'));
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(addProducts);

        let actionClicked = event.getSource().getLocalId();
        let navigate = component.get('v.navigateFlow');
        navigate(actionClicked);
    }

})