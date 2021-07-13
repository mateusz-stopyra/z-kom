public without sharing class ZK_ProductShopController {

    private static final String CACHE_NAME = 'local.ZKOM';

    @AuraEnabled
    public static Profile getCurrentProfile() {
        String profileId = UserInfo.getProfileId();
        Profile profile = [SELECT Name FROM Profile WHERE Id=:profileId LIMIT 1];
        return profile;
    }

    @AuraEnabled
    public static List<Object> getProductsCart() {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_NAME);
        if (sessionPart == null){
            return null;
        }
        return (List<Object>) sessionPart.get('cart');
    }

    @AuraEnabled
    public static Boolean setProductsCart(List<Object> cart) {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_NAME);
        if (sessionPart == null){
            return false;
        }
        sessionPart.remove('cart');
        sessionPart.put('cart', cart);
        return true;
    }

    @AuraEnabled
    public static List<PricebookEntry> getProductPrice(String productId){
        List<PricebookEntry> prices = [SELECT UnitPrice from PricebookEntry WHERE Product2Id=:productId and IsActive = TRUE ORDER BY UnitPrice];
        return prices;
    }

    @AuraEnabled
    public static void addProductsToOpportunityLineItem(List<ZK_ProductsWrapper> products, String opportunityId){
        List<OpportunityLineItem> items = new List<OpportunityLineItem>();
        for(ZK_ProductsWrapper p : products){
            OpportunityLineItem opportunityLineItem = new OpportunityLineItem();
            opportunityLineItem.Product2Id = p.id;
            opportunityLineItem.UnitPrice = p.unitPrice;
            opportunityLineItem.Quantity = p.amount;
            opportunityLineItem.OpportunityId = opportunityId;
            items.add(opportunityLineItem);
        }
        insert items;
    }

    @AuraEnabled
    public static void addProductsToOrderProduct(String opportunityId, String orderId){
        System.debug(opportunityId);
        System.debug(orderId);

        List<OrderItem> items = new List<OrderItem>();
        for(OpportunityLineItem p : [SELECT Id, Quantity, UnitPrice, Product2Id, PricebookEntryId from OpportunityLineItem where OpportunityId=:opportunityId]){
            OrderItem orderItem = new OrderItem();
            orderItem.OrderId = orderId;
            orderItem.Quantity = p.Quantity;
            orderItem.UnitPrice = p.UnitPrice;
            orderItem.PricebookEntryId = p.PricebookEntryId;
            orderItem.Product2Id = p.Product2Id;
            items.add(orderItem);
        }
        insert items;
    }

    @AuraEnabled
    public static void resetBasket(List<Object> cart) {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_NAME);
        sessionPart.remove('cart');
    }

    @AuraEnabled
    public static List<OpportunityLineItem> getProductsFromOrderProduct(String opportunityId){
        List<OpportunityLineItem> items = [SELECT Id, Quantity,TotalPrice, UnitPrice, Product2Id, Product2.Display_Image__c, Product2.Name, PricebookEntryId from OpportunityLineItem where OpportunityId=:opportunityId];
        return items;
    }
}