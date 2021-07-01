({

    handleDeleteProduct: function (component, event, helper) {
        const id = component.get('v.productId');

        const action = component.get('c.deleteProduct');
        helper.handleDeleteProd(component,action,id);

    },

    closeDialog : function (component,event) {
        component.find('overlayLib1').notifyClose();
    }

})