({
    changeProductQuantity: function(component, productId, byQuantity) {
        const products = component.get('v.products');
        let finalAmount = 0;
        let productIndex;
        for (let p in products) {
            const product = products[p];
            if (product.Id === productId) {
                product.Amount += byQuantity;
                finalAmount = product.Amount;
                productIndex = p;
                break;
            }
        }
        if (finalAmount < 1) {
            products.splice(productIndex, 1);
        }
        const action = component.get('c.setProductsCart');
        action.setParams({
            cart: products
        });
        action.setCallback(this, res => {
            const state = res.getState();
            if (state === 'SUCCESS') {
                const cartSize = component.get('v.cartSize');
                component.set('v.cartSize', cartSize+byQuantity);
                component.set('v.products', products);
                this.determineTotalPrice(component);
                if (products.length === 0) {
                    component.set('v.cartVisible', false);
                }
            }
            else {
                console.log(state);
                console.log(res.getError());
            }
        });
        $A.enqueueAction(action);
    },

    removeProduct: function(component, productId) {
        const products = component.get('v.products');
        let productIndex = -1;
        let productAmount = 0;
        for (let p in products) {
            const product = products[p];
            if (product.Id === productId) {
                productIndex = p;
                productAmount = product.Amount;
                break;
            }
        }
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            const action = component.get('c.setProductsCart');
            action.setParams({
                cart: products
            });
            action.setCallback(this, res => {
                const state = res.getState();
                if (state === 'SUCCESS') {
                    component.set('v.products', products);
                    const cartSize = component.get('v.cartSize');
                    component.set('v.cartSize', cartSize-productAmount);
                    this.determineTotalPrice(component);
                    if (products.length === 0) {
                        component.set('v.cartVisible', false);
                    }
                }
                else {
                    console.log(state);
                    console.log(res.getError());
                }
            });
            $A.enqueueAction(action);
        }
    },

    determineTotalPrice: function (component) {
        let totalPrice = 0;
        const products = component.get('v.products');
        for (let p in products) {
            const product = products[p];
            totalPrice += product.Amount * product.UnitPrice;
        }
        component.set('v.totalPrice', totalPrice);
    }
})