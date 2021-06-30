({

    doInit : function (component, event, helper) {
        const action = component.get('c.getProductData');
        const id = component.get('v.productId');

        action.setParams({
            productId : id,
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                const returnVal = response.getReturnValue();
                const images = component.get('v.images');
                returnVal.images.forEach(image =>{
                    images.push(image.ContentDocumentId);
                });
                component.set('v.images',images);
            }
        });
        $A.enqueueAction(action);
    },

    selectDisplayImage : function (component, event, helper) {
        alert('wybrnao');
        const imageId = event.target.id;
        const productId = component.get('v.productId');
        alert('image' + imageId);
        alert('product' + productId);
        const action = component.get("c.updateDisplayImage");
        action.setParams({
            productId : productId,
            imageId : imageId
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            alert(response.getState());
            if (state === "SUCCESS") {
                component.set("v.selectedImage", imageId);
                alert(imageId);
                alert(component.get('v.selectedImage'));
            }
        });
        $A.enqueueAction(action);
    }

})