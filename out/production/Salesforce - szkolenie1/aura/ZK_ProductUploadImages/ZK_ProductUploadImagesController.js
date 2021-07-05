({
    onImagesUploaded: function (component, event, helper) {
        const images = component.get('v.images');
        const uploaded = event.getParam('files');

        uploaded.forEach(img => {
            images.push(img.documentId);
        });

        component.set('v.images', images);
    },

    deleteImage: function (component, event) {
        const id = event.target.id;

        const action = component.get('c.deleteImg');

        action.setParams({
            id: id
        });

        alert(id);

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                const images = component.get('v.images');
                images.splice(images.indexOf(id), 1);
                component.set('v.images', images);

            } else {
                alert(state);
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },

    doInit: function (component, event, helper) {
        const action = component.get('c.getProductData');
        const id = component.get('v.productId');

        helper.onInit(component, action, id);
    },
})