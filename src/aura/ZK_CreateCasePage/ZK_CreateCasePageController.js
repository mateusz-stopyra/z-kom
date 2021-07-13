({
    init: function (component) {
        let orderId = localStorage.getItem('createCaseOrderId');
        let flow = component.find("flowData");
        let inputVariables = [
            {name: "CaseOrderId", type: "String", value: orderId}
            ];
        flow.startFlow("Create_Case_Custom", inputVariables);
        localStorage.clear();
    }
})