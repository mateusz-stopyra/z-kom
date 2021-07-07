public with sharing class ZK_ProductShopController {

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

}