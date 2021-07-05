({
    onLoad : function(component, event, helper) {
        const actions = [
            { label: 'View', name: 'view' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete'}];


        component.set('v.mycolumns', [
            {label: 'Product Name', fieldName: 'linkName', type: 'url',
            typeAttributes: {label: {fieldName: 'Name'}}},
            {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
            {label: 'Manufacturer', fieldName: 'Manufacturer__c', type: 'text'},
            {label: 'Model', fieldName: 'Model__c', type: 'text'},
            {label: 'Product Family', fieldName: 'Family', type: 'text'},
            { type: 'action', typeAttributes: { rowActions: actions } } ] );

        helper.fetchProd(component);

        },

    onRow : function(component, event, helper) {
        const action = event.getParam('action').name;
        const row = event.getParam('row');
        const productId = row.Id;


        switch ( action ) {
            case 'edit':
                helper.editProd(component, productId);
                break;
            case 'view':
                var viewRecordEvent = $A.get("e.force:navigateToURL");
                viewRecordEvent.setParams({
                    "url": "/" + productId
                });
                viewRecordEvent.fire();
                break;
            case 'delete':
                const productName = event.getParam('row').Name;
                helper.showDeleteModal(component,productId,productName);
                break;
        }
    },




})