({
    addProductToCart: function (component, product, image, unitPrice) {
        const products = component.get('v.productsInCart');
        const cartSize = component.get('v.cartSize');
        const productCart = component.find('productCart');
        let productsAmount = 0;
        let productExists = false;
        if (products.length !== 0) {
            for (let pi in products) {
                const p = products[pi];
                if (p.Id === product.Id) {
                    p.Amount++;
                    productsAmount = p.Amount;
                    productExists = true;
                    break;
                }
            }
        }
        if (!productExists) {
            product.Image = image;
            product.Amount = 1;
            productsAmount = product.Amount;
            product.UnitPrice = unitPrice;
            products.push(product);
        }
        const action = component.get('c.setProductsCart');
        action.setParams({
            cart: products
        });
        action.setCallback(this, res => {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.productsInCart', products);
                component.set('v.cartSize', cartSize+1);
                productCart.recalculateTotalPrice();
                const toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: 'Item added',
                    message: 'You have successfully added item to your shopping cart. ',
                    type: 'success'
                });
                toastEvent.fire();
            }
            else {
                console.log(state);
                console.log(res.getError());
            }
        });
        $A.enqueueAction(action);
    },

    fetchCart: function (component, event, helper) {
        const action = component.get('c.getProductsCart');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                const products = res.getReturnValue();
                if (products === null) {
                    return;
                }
                component.set('v.productsInCart', products);
                const productCart = component.find('productCart');
                productCart.recalculateTotalPrice();
                let cartSize = 0;
                for (let i in products) {
                    const product = products[i];
                    cartSize += product.Amount;
                }
                component.set('v.cartSize', cartSize);
            }
        });
        $A.enqueueAction(action);
    }
})