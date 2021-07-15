({
    handleResponse : function(component, event) {
        let params = event.getParam('arguments');
        let response = params.response;
        let successHandler = params.successHandler;
        let errorHandler = params.errorHandler;

        let state = response.getState();

        if(state == 'SUCCESS') {
            successHandler(response);
        } else {
            let toastEvent = $A.get("e.force:showToast");
            let message = '';

            if (state === "INCOMPLETE") {
                message = 'Server could not be reached. Check your internet connection.';
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    for(let i=0; i < errors.length; i++) {
                        for(let j=0; errors[i].pageErrors && j < errors[i].pageErrors.length; j++) {
                            message += (message.length > 0 ? '\n' : '') + errors[i].pageErrors[j].message;
                        }
                        if(errors[i].fieldErrors) {
                            for(let fieldError in errors[i].fieldErrors) {
                                let thisFieldError = errors[i].fieldErrors[fieldError];
                                for(let j=0; j < thisFieldError.length; j++) {
                                    message += (message.length > 0 ? '\n' : '') + thisFieldError[j].message;
                                }
                            }
                        }
                        if(errors[i].message) {
                            message += (message.length > 0 ? '\n' : '') + errors[i].message;
                        }
                    }
                } else {
                    message += (message.length > 0 ? '\n' : '') + 'Unknown error';
                }
            }

            toastEvent.setParams({
                title: 'Error',
                type: 'error',
                message: message
            });

            toastEvent.fire();
            if(errorHandler) {
                errorHandler(response);
            }
        }
    }


    // showToast: function(component, event, helper) {
    //     let params = event.getParam('arguments');
    //     let title = params.title;
    //     let type = params.type;
    //     let message = params.message;
    //     helper.showToast(title, type, message);
    // },
    // showToast_error: function(component, event, helper) {
    //     let params = event.getParam('arguments');
    //     let title = params.title;
    //     let type = 'error';
    //     let message = params.message;
    //     helper.showToast(title, type, message);
    // },
    // showToast_success: function(component, event, helper) {
    //     let params = event.getParam('arguments');
    //     let title = params.title;
    //     let type = 'success';
    //     let message = params.message;
    //     helper.showToast(title, type, message);
    // }
})