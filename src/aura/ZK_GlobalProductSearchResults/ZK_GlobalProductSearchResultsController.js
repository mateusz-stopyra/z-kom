({
    doInit: function (component, event, helper) {
        const searchQueryJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(searchQueryJson)) {
            const searchQueryParsed = JSON.parse(searchQueryJson);
            helper.onSearch(component, searchQueryParsed);
        }
    }
})