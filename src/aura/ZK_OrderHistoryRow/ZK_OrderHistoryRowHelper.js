({
    handleCreateCase : function (component, event) {
        let evt = $A.get("e.force:navigateToURL");
        evt.setParams({
            "url": "/contact-support"
        });
        localStorage.setItem('createCaseOrderId',component.get('v.orderRow.order.Id'));
        evt.fire();
    }
})