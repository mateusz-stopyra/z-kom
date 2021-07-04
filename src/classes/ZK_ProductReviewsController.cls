public with sharing class ZK_ProductReviewsController {

    @AuraEnabled
    public static List<Local_Review__c> getProductReviews(Id productId) {
        List<Local_Review__c> reviews = [SELECT Rating__c, Content__c, CreatedBy.Name, CreatedBy.SmallPhotoUrl FROM Local_Review__c WHERE Product__c=:productId];
        return reviews;
    }

    @AuraEnabled
    public static Profile getCurrentProfile() {
        String profileId = UserInfo.getProfileId();
        Profile profile = [SELECT Name FROM Profile WHERE Id=:profileId LIMIT 1];
        return profile;
    }

}