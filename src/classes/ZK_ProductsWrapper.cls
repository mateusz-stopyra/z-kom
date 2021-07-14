public with sharing class ZK_ProductsWrapper {

    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String image { get; set; }
    @AuraEnabled public String id { get; set; }
    @AuraEnabled public Decimal unitPrice { get; set; }
    @AuraEnabled public Decimal amount { get; set; }

}