({
    onLoadImageSelect : function (component, action, id) {
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

    onSelectDisplay : function (component,imageId,productId,action) {
        action.setParams({
            productId : productId,
            imageId : imageId
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.selectedImage", imageId);
            }
        });
        $A.enqueueAction(action);
    }


})