({
    onProductClick : function(component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.handleProductClick(component,productId);
        },

    onProductShop: function (component, event, helper) {
        const product = component.get('v.product');

        component.set('v.image', '/sfc/servlet.shepherd/document/download/' + product.Display_Image__c);
        component.set('v.unitPrice', product.PricebookEntries[0].UnitPrice);

        const image = component.get('v.image');
        const price = component.get('v.price');

        const productShopped = $A.get('e.c:ZK_ProductShopped');
        productShopped.setParams({
            product: product,
            image: image,
            unitPrice: price
        });
        productShopped.fire();
    },

    doInit: function(component, event, helper) {
        helper.fetchCurrentProfile(component);
        helper.getPrice(component, event);
    },

})