({
    fetchProd : function (component) {
        const action = component.get('c.getProducts');
        action.setCallback(this, res =>{
            const state = res.getState();
            if(state === 'SUCCESS'){
                const products = res.getReturnValue();
                products.forEach(p =>{
                    p.linkName = '/' + p.Id;
                });
                component.set('v.products',products);
            }else{
                alert(JSON.stringify(res.getError()));
            }
        });
            $A.enqueueAction(action);
    },

    editProd : function (component, productId) {
        const e = component.getEvent('newProduct');
        e.setParams({
            productId : productId
        });
        e.fire();
    },


    showDeleteModal : function(component, productId, productName) {
        const overlay = component.find('overlayLib');
        $A.createComponent('c:ZK_ProductDeleteModal', {
            productId: productId,
            productName: productName
        }, function(component, status) {
            if (status === 'SUCCESS') {
                const modalBody = component;
                overlay.showCustomModal({
                    header: 'Delete Product Confirmation',
                    body: modalBody,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

  })