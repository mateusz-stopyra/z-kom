public with sharing class ZK_PriceBookController {


    @AuraEnabled
    public static void newPriceBook(String name, Map<String, Integer> products) {
        System.debug(products);
        if (validate(name, products)) {
            Pricebook2 pricebook = createPriceBook(name);
            populatePriceBook(pricebook, products);
        }
    }

    @AuraEnabled
    public static List<Pricebook2> getPriceBooks() {
        return [SELECT Name, IsActive from Pricebook2 WHERE Pricebook2.IsStandard = false ORDER BY CreatedDate DESC];

    }

    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries(String priceBookId) {
        return [SELECT Id, ZK_Percent__c, Product2.Id, Product2.Name, Product2.Display_Image__c, Product2.Manufacturer__c, Product2.Model__c FROM PricebookEntry where Pricebook2Id = :priceBookId];
    }

    @AuraEnabled
    public static void deactivatePriceBook(String priceBookId) {
        setPriceBookActive(priceBookId, false);
    }

    @AuraEnabled
    public static void activatePriceBook(String priceBookId) {
        setPriceBookActive(priceBookId, true);
    }

    @AuraEnabled
    public static Boolean deleteDiscount(Id id) {
        List<PricebookEntry> entries = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :id];
        delete entries;

        Database.DeleteResult res = Database.delete(id);
        return res.success;
    }

    private static void setPriceBookActive(String priceBookId, Boolean value) {
        Pricebook2 pricebook = [SELECT Id, IsActive FROM Pricebook2 WHERE Id = :priceBookId];
        List<PricebookEntry> prices = [SELECT Id, IsActive FROM PricebookEntry WHERE Pricebook2Id = :priceBookId];
        List<SObject> all = new List<SObject>();

        pricebook.IsActive = value;
        for (PricebookEntry price : prices) {
            price.IsActive = value;
        }

        all.addAll(prices);
        all.add(pricebook);

        update all;
    }

    private static Boolean validate(String name, Map<String, Integer> products) {
        System.debug(products);
        if (products.size() == 0) {
            throw new AuraHandledException('Select at least one product');
        }
        if (String.isBlank(name)) {
            throw new AuraHandledException('Provide name for a discount');
        }
        for (String key : products.keySet()) {
            System.debug(products.get(key));
            if (products.get(key) <= 0 || products.get(key) > 100) {
                throw new AuraHandledException('Discount price error');
            }
        }
        return true;
    }

    private static Pricebook2 createPriceBook(String name) {
        Pricebook2 pricebook = new Pricebook2(Name = name, IsActive = false);
        try {
            insert pricebook;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return pricebook;
    }

    private static List<PricebookEntry> populatePriceBook(Pricebook2 pricebook2, Map<String, Integer> products) {


        List<PricebookEntry> newPrices = new List<PricebookEntry>();
        List<PricebookEntry> actualPrices;

        actualPrices = [SELECT Id, UnitPrice, Product2Id FROM PricebookEntry WHERE Pricebook2.IsStandard = true];


        for (String productId : products.keySet()) {
            PricebookEntry price = getProductPriceFromList(productId, actualPrices);
            PricebookEntry newPrice = new PricebookEntry();
            newPrice.Product2Id = productId;
            newPrice.Pricebook2Id = pricebook2.Id;
            newPrice.ZK_Percent__c = products.get(productId);
            newPrice.IsActive = false;
            newPrice.UnitPrice = price.UnitPrice - (price.UnitPrice * (Decimal.valueOf(products.get(productId)) / 100));
            newPrices.add(newPrice);
        }

        try {
            insert newPrices;
        } catch (Exception e) {
            System.debug(e);
        }

        return newPrices;
    }

    private static PricebookEntry getProductPriceFromList(String productId, List<PricebookEntry> prices) {
        for (PricebookEntry price : prices) {
            if (price.Product2Id == productId) {
                return price;
            }
        }
        return null;
    }

}