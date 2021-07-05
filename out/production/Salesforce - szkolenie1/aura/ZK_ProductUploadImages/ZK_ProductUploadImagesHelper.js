({
    onInit : function (component, action, id) {
        action.setParams({
            productId : id,
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()!=null) {
                    const returnVal = response.getReturnValue();
                    const images = component.get('v.images');
                    component.set('v.currentImage', returnVal.product.Display_Image__c);
                    images.push(returnVal.product.Display_Image__c);
                    returnVal.images.forEach(image => {
                        if (image.ContentDocumentId === returnVal.product.Display_Image__c) {
                            return;
                        }
                        images.push(image.ContentDocumentId);
                    });
                    component.set('v.images', images);
                }
            }
        });
        $A.enqueueAction(action);
    }
})