public with sharing class ZK_ProductShopController {

    @AuraEnabled
    public static Profile getCurrentProfile() {
        String profileId = UserInfo.getProfileId();
        Profile profile = [SELECT Name FROM Profile WHERE Id=:profileId LIMIT 1];
        return profile;
    }






}