({
    doSearch : function(component, event, helper) {
        const params = event.getParam('arguments');
        const searchQuery = params.searchQuery;

        component.set('v.searchQuery', searchQuery);

        helper.onSearch(component, searchQuery);
    },

    doGearSelect : function(component, event, helper) {
        const params = event.getParam('arguments');
        const searchQuery = params.gearSelect;

        component.set('v.gearSelect', searchQuery);

        helper.onGearSelect(component, searchQuery);
    },
})