public with sharing class ZK_PriceBookController {

    //1szy string to id produktu, drugi o ile przecena
    @AuraEnabled
    public static void newPriceBook(String name, Map<String, Integer> products){
        if(validate(name, products)){
            Pricebook2 pricebook;
        };
    }

    @AuraEnabled
    public static List<Pricebook2> getPriceBooks(){

    }

    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries(String priceBookId){
        return [SELECT Id, Product2.Id, Product2.Name, FROM PricebookEntry where Pricebook2Id =: priceBookId];
    }

    @AuraEnabled
    public static void deactivatePriceBook(String priceBookId){
        setPriceBookActive(priceBookId, true);
    }

    @AuraEnabled
    public static void activatePriceBook(String priceBookId){
        setPriceBookActive(priceBookId, false);
    }

    private static void setPriceBookActive(String priceBookId, Boolean value){
        Pricebook2 pricebook = [SELECT Id, IsActive FROM Pricebook2 WHERE Id =: priceBookId];
        List<PricebookEntry> prices = [SELECT Id, IsActive FROM PricebookEntry WHERE Pricebook2Id =: priceBookId];
        List<SObject> all = new List<SObject>();

        pricebook.IsActive = value;
        for(PricebookEntry price : prices){
            price.IsActive = value;
        }

    }






}