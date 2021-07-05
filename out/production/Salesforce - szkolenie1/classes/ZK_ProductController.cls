public with sharing class ZK_ProductController {

    public class ProductData{
        @AuraEnabled public Product2 product;
        @AuraEnabled public List<ContentDocumentLink> images;
    }

    @AuraEnabled
    public static List<Product2> getProducts(){
        List<Product2> products = [SELECT Id, Name, DescriptionCustom__c, Manufacturer__c, Model__c, Family, ProductCode, IsActive, GearType__c from Product2];
        return products;
    }

    @AuraEnabled
    public static List<ContentDocumentLink> getImages(Id productId){
        List<ContentDocumentLink> images = [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:productId];
        return images;
    }

    @AuraEnabled
    public static Boolean updateDisplayImage(Id productId, Id imageId){
        List<Product2> product = [SELECT Display_Image__c FROM Product2 WHERE Id=:productId];
        if(product.isEmpty()){
            return false;
        }

        product[0].Display_Image__c = imageId;
        Database.SaveResult[] results = Database.update(product);

        return results[0].success;
    }

    @AuraEnabled
    public static ProductData getProductData(Id productId){
        List<Product2> product = [SELECT Display_Image__c FROM Product2 WHERE Id=:productId];
        if(product.isEmpty()){
            return null;
        }

        ProductData productData = new ProductData();
        productData.product = product[0];
        productData.images = [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:productId];

        return productData;
    }

    @AuraEnabled
    public static List<Product2> getSearchResults(String searchQuery){
        List<String> searchResultsList = new List<String>();
        String searchQueryString = 'SELECT Id, Name, DescriptionCustom__c, Display_Image__c, Manufacturer__c, Model__c, Family, ProductCode, IsActive, GearType__c,(SELECT UnitPrice from PricebookEntries where Pricebook2.IsStandard=true) from Product2';
        if(String.isNotBlank(searchQuery)){
            searchQuery = String.escapeSingleQuotes(searchQuery).trim();
            searchResultsList.add('Name LIKE \'' + searchQuery + '%\'');
        }
        if (searchResultsList.size() > 0) {
            searchQueryString += ' WHERE ' + searchResultsList;
        }
        List<Product2> products = Database.query(searchQueryString);
        System.debug(products);
        return products;
    }



    @AuraEnabled
    public static List<Product2> getGearTypeSearchResults(String searchQuery){
        List<String> searchResultsList = new List<String>();
        String searchQueryString = 'SELECT Id, Name, DescriptionCustom__c, Display_Image__c, Manufacturer__c, Model__c, Family, ProductCode, IsActive, GearType__c,(SELECT UnitPrice from PricebookEntries where Pricebook2.IsStandard=true) from Product2';
        if(String.isNotBlank(searchQuery)){
            searchQuery = String.escapeSingleQuotes(searchQuery).trim();
            searchResultsList.add('GearType__c LIKE \'' + searchQuery + '%\'');
        }
        if (searchResultsList.size() > 0) {
            searchQueryString += ' WHERE ' + searchResultsList;
        }
        List<Product2> products = Database.query(searchQueryString);
        System.debug(products);
        return products;
    }

    @AuraEnabled
    public static Boolean deleteImg(Id id){
        return Database.delete(id).success;
    }

    @AuraEnabled
    public static Boolean deleteProduct(Id id){
        return Database.delete(id).success;
    }



}