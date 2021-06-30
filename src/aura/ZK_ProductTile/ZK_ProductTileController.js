({
    onProductClick : function(component, event, helper) {
        const productId = component.get('v.product.Id');

                var viewRecordEvent = $A.get("e.force:navigateToURL");
                viewRecordEvent.setParams({
                    "url": "/" + productId
                });
                viewRecordEvent.fire();
        }



})