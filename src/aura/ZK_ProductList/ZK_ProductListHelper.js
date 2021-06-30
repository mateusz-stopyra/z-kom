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

    deleteProduct : function (component, productId, productName) {
        const e = component.getEvent('deleteProduct');
        e.setParams({
            productId : productId,
            productName : productName
        });
        e.fire();
    }




      // fetchProdHelper : function(component, event, helper) {
      //
      //            var actions = [
      //                 { label: 'View', name: 'view' },
      //                 { label: 'Edit', name: 'edit' },
      //                 { label: 'Delete', name: 'delete'}];
      //
      //
      //     component.set('v.mycolumns', [
      //         {label: 'Product Name', fieldName: 'Name', type: 'text'},
      //             {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
      //             {label: 'Product Description', fieldName: 'Description', type: 'text'},
      //             {label: 'Product Family', fieldName: 'Family', type: 'text'},
      //              { type: 'action', typeAttributes: { rowActions: actions } } ] );
      //
      //     var action = component.get("c.getProducts");
      //     action.setParams({
      //     });
      //     action.setCallback(this, function(response){
      //         var state = response.getState();
      //         if (state === "SUCCESS") {
      //             component.set("v.products", response.getReturnValue());
      //         }
      //     });
      //     $A.enqueueAction(action);
      // },
      //
      //    handleRowAction: function ( component, event, helper ) {
      //
      //         var action = event.getParam( 'action' );
      //         var row = event.getParam( 'row' );
      //         var recId = row.Id;
      //
      //         switch ( action.name ) {
      //             case 'edit':
      //                 var editRecordEvent = $A.get("e.force:editRecord");
      //                 editRecordEvent.setParams({
      //                     "recordId": recId
      //                 });
      //                 editRecordEvent.fire();
      //                 break;
      //             case 'view':
      //                 var viewRecordEvent = $A.get("e.force:navigateToURL");
      //                 viewRecordEvent.setParams({
      //                     "url": "/" + recId
      //                 });
      //                 viewRecordEvent.fire();
      //                 break;
      //         }
      //     }
  })