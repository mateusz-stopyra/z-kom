({
    doInit: function (component, event, helper) {
        const searchQueryJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(searchQueryJson)) {
            const searchQueryParsed = JSON.parse(searchQueryJson);
            console.log(searchQueryParsed);
            helper.onSearch(component, searchQueryParsed);
        }
    }
})