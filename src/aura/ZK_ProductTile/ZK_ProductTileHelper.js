({
    handleProductClick : function (component, productId) {
        const id = component.get('v.product').Id;

        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': id,
            'slideDevName': 'related'
        });
        navEvt.fire();
    },

    fetchCurrentProfile: function(component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.currentProfile', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    getPrice : function (component, event) {
        let action = component.get('c.getProductPrice');
        action.setParams({
            'productId' : component.get('v.product.Id')
        });
        let toastErrorHandler = component.find('toastErrorHandler');
        action.setCallback(this,function(response){
            toastErrorHandler.handleResponse(
                response,
                function(response){
                const temp=response.getReturnValue();
                component.set('v.price',temp[0].UnitPrice);
                if (temp.length > 1) {
                    component.set('v.defaultPrice', temp[temp.length - 1].UnitPrice);
                }
            })
        });
        $A.enqueueAction(action);
    },

    handleProductShop : function (component, event) {
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
    }

})