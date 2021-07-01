({
    doInit : function (component, event, helper) {
        const action = component.get('c.getProductData');
        const id = component.get('v.recordId');
        helper.onLoadImages(component, action, id);
    },

    nextImage : function (component, event, helper) {
        const index = component.get('v.currentIndex');
        const images = component.get('v.images');
        if(index === images.length-1){
            component.set('v.currentIndex',0);
            component.set('v.currentImage',images[0]);
        }else{
            component.set('v.currentIndex', index+1);
            component.set('v.currentImage',images[index+1]);
        }
    },

    previousImage : function (component, event, helper) {
        const index = component.get('v.currentIndex');
        const images = component.get('v.images');
        if(index === 0){
            component.set('v.currentIndex',images.length-1);
            component.set('v.currentImage',images[images.length-1]);
        }else{
            component.set('v.currentIndex', index-1);
            component.set('v.currentImage',images[index-1]);
        }
    },

    selectImage : function (component, event, helper) {
        const imageId = event.target.id;
        const selectedImage = component.get('v.currentImage');
        if(selectedImage === imageId || !imageId){
            return;
        }

        const images = component.get('v.images');
        component.set('v.currentImage',imageId);
        component.set('v.currentIndex',images.indexOf(imageId));

    }



});