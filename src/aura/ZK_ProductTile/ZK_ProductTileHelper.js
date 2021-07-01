({
    handleProductClick : function (component, productId) {
        var viewRecordEvent = $A.get("e.force:navigateToURL");
        viewRecordEvent.setParams({
            "url": "/" + productId
        });
        viewRecordEvent.fire();
    }
})