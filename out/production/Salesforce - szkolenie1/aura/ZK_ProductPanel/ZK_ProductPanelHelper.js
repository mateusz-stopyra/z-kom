({
    onCreatedDialog : function (component, productId) {
        const overlay = component.find('overlayLib');
        $A.createComponent('c:ZK_ProductCreate',{productId : productId}, function (component, status) {
            if(status === 'SUCCESS'){
                const modalBody = component;
                overlay.showCustomModal({
                    body : modalBody,
                    showCloseButton : true,
                    cssClass : 'slds-modal_medium',
                    closeCallback : function () {
                    }
                });
            }
        });
    }
})