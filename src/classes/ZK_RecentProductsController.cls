public with sharing class ZK_RecentProductsController {

    @AuraEnabled
    public static List<Product2> getRecentlyViewed() {
        List<RecentlyViewed> recentProducts = [
                SELECT Id, Name FROM RecentlyViewed
                WHERE Type = 'Product2'
                AND LastViewedDate != null
                ORDER BY LastViewedDate DESC
                LIMIT 10
        ];
        List<Id> productsIds = new List<Id>();
        for (RecentlyViewed recentlyViewed : recentProducts) {
            productsIds.add(recentlyViewed.Id);
        }
        List<Product2> entries = [
                SELECT Id, Name, Display_Image__c, Manufacturer__c, Model__c, Family, ProductCode, IsActive, GearType__c,(SELECT UnitPrice from PricebookEntries where Pricebook2.IsStandard=true and IsActive = TRUE)
                FROM Product2
                WHERE Product2.Id IN :productsIds];
        return entries;
    }
}