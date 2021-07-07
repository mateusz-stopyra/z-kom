({
    openNewReviewModal: function (component, productId, reviewId) {
        const overlay = component.find('overlayLib');
        $A.createComponent('c:ZK_ProductAddReview', {productId: productId, reviewId: reviewId}, function(component, status) {
            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: 'Add a Review',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });
            }
        });
    },

    fetchCurrentProfile: function(component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.currentProfile', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    fetchReviews: function(component, productId) {
        const action = component.get('c.getProductReviews');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.reviews', res.getReturnValue());
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });
        $A.enqueueAction(action);
    },

    fetchAverageRating: function(component, productId) {
        const action = component.get('c.getAverageRating');
        action.setParams({
            productId: productId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.averageRating', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

})