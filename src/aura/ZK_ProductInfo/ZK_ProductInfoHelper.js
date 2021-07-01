({
    loadRecord : function (component, id) {
        if(id!=null){
            return;
        }
        component.find('recordEditor').getNewRecord(
            'Product2',
            null,
            false,
            $A.getCallback(function () {
                const rec = component.get('v.record');
                const error = component.get('v.error');
                if(error || (rec === null)){
                    console.log('There is an error with record template init ' + error);
                }else{
                    console.log('Record template init successful for: ' + rec.apiName);
                }

            })
        );
    },

    saveRecord : function (component) {
        component.set('v.simpleRecord.Id', component.get('v.recordId'));
        component.find('recordEditor').saveRecord(function (saveResult) {
            if (saveResult.state === 'SUCCESS' || saveResult.state === 'DRAFT'){
                const id = saveResult.recordId;

                const productSavedEvent = component.getEvent('productSaved');
                productSavedEvent.setParams({
                    productId: id
                });
                productSavedEvent.fire();
            }
            else if (saveResult.state === "ERROR") {
                var errors = "";
                for (var i = 0; saveResult.error.length > i; i++){
                    errors = errors + saveResult.error[i].message;
                    console.log(errors);
                }
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "type":"error",
                    "title": "Error!",
                    "message": 'Some of the required fields are missing. Please complete them and try again.'
                });
                resultsToast.fire();
            }

        });
    },


})