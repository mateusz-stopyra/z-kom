({

    doInit : function (component, event, helper) {
        const action = component.get('c.getProductData');
        const id = component.get('v.productId');
        helper.onLoadImageSelect(component, action, id);
    },

    selectDisplayImage : function (component, event, helper) {
        const imageId = event.target.id;
        const productId = component.get('v.productId');
        const action = component.get("c.updateDisplayImage");
        helper.onSelectDisplay(component,imageId,productId,action);
    }

})