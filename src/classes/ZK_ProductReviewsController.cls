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

    @AuraEnabled
    public static Integer getAverageRating(Id productId) {
        List<AggregateResult> res = [SELECT AVG(Rating__c) FROM Local_Review__c WHERE Product__c=:productId];
        if (res.isEmpty()) {
            return 0;
        }

        Decimal average = (Decimal) res[0].get('expr0');
        return Integer.valueOf(average.round());
    }
}