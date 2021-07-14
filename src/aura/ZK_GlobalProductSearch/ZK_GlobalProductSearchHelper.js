({
    navigateToProductsSearchPage: function(component, formData) {
        sessionStorage.setItem('customSearch--recordIds', JSON.stringify(formData));

        console.log(JSON.stringify(formData));

        const navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/products'});
        navEvt.fire();
    },

})