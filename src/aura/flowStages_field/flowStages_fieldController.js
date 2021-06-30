({
   init : function(component, event, helper) {
      let progressIndicator = component.find('progressIndicator');
      let body = [];
      for (let step of component.get('v.stages')) {
         $A.createComponent(
            "lightning:progressStep",
            {
               "aura:id": "step_" + step,
               "label": step,
               "value": step
            },
            function(newProgressStep, status, errorMessage){
               if (status === "SUCCESS") {
                  body.push(newProgressStep);
               }
               else if (status === "INCOMPLETE") {
                  console.log("No response from server, or client is offline.")
               }
               else if (status === "ERROR") {
                  console.log("Error: " + errorMessage);
               }
            }
         );
      }
      progressIndicator.set("v.body", body);
   }
})