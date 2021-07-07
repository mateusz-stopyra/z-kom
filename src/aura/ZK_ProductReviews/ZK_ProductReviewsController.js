({
    doInit: function(component, event, helper) {
        const productId = component.get('v.recordId');
        helper.fetchReviews(component, productId);
        helper.fetchCurrentProfile(component);
        helper.fetchAverageRating(component, productId);
    },

    onNewReviewClick: function (component, event, helper) {
        const productId = component.get('v.recordId');
        helper.openNewReviewModal(component, productId, null);
    },

    onReviewUpdated: function (component, event, helper) {
        const productId = component.get('v.recordId');
        helper.fetchReviews(component, productId);
        helper.fetchAverageRating(component, productId);
    }
})