({
    init : function (component) {
        // component.set('v.productsOrder', JSON.parse(localStorage.getItem('products')));
        let flow = component.find("flowData");
        flow.startFlow("Create_Product_Order");
        // console.log(JSON.stringify(component.get('v.productsOrder')));
    },
})