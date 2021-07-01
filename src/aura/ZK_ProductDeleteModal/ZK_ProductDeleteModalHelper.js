({
    handleDeleteProd : function (component,action,id) {
        action.setParams({
            id: id
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert(state);
                const deleteEvent = $A.get('c.e:ZK_DeleteProductApp');
                deleteEvent.fire();
                component.find('overlayLib1').notifyClose();
            } else {
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
        component.find('overlayLib1').notifyClose();
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            'duration':' 5000',
            'type': 'success',
            'mode': 'pester',
            "message": "Product has been deleted successfully."
        });
        toastEvent.fire();
    }
})