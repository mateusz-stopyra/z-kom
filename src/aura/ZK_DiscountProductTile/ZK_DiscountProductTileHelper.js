({
    getPrice: function (component, event) {
        let action = component.get('c.getProductPrice');
        action.setParams({
            'productId': component.get('v.product.Id')
        });
        action.setCallback(this, function (response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                const temp = response.getReturnValue();
                component.set('v.price', temp[0].UnitPrice);
                if (temp.length > 1) {
                    component.set('v.defaultPrice', temp[temp.length - 1].UnitPrice);
                }
                component.set('v.priceCount',temp.length);
            }
        });
        $A.enqueueAction(action);
    },

    toggleProduct: function (component, event) {
        const priceCount = component.get('v.priceCount');
        if(priceCount > 1){
            return;
        }
        let selectedItems = component.get('v.selectedProducts');
        component.set('v.percentThis', component.get('v.percent'));
        if (!selectedItems) {
            selectedItems = {};
        }
        const isTrue = component.get('v.selected');
        if (isTrue) {
            delete selectedItems[component.get('v.product.Id')];
            component.set('v.percentThis',null);
            component.set('v.selected',false);
        }
        else {
            selectedItems[component.get('v.product.Id')] = component.get('v.percentThis');
            component.set('v.selected', true);
        }
        component.set('v.selectedProducts', selectedItems);
    },

    reInit: function (component, event) {
        component.set('v.selected', false);
    },
})