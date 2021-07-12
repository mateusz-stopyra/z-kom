({
    determineTotalPrice: function (component) {
        let totalPrice = 0;
        const products = component.get('v.products');
        for (let p in products) {
            const product = products[p];
            totalPrice += product.Amount * product.UnitPrice;
        }
        component.set('v.totalPrice', totalPrice);
    },

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
        this.determineTotalPrice(component);
        component.set('v.products', products);

    },

})