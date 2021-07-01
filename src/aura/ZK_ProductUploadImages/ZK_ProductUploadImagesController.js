({
    onImagesUploaded : function (component, event, helper) {
        const images = component.get('v.images');
        const uploaded = event.getParam('files');

        uploaded.forEach(img => {
            images.push(img.documentId);
        });

        component.set('v.images',images);
    },

    doInit : function (component, event, helper) {
        const action = component.get('c.getProductData');
        const id = component.get('v.productId');

        helper.onInit(component, action, id);
    },
})