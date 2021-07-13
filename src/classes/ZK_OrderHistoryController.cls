public with sharing class ZK_OrderHistoryController {

    public class OrderHistoryData{
        @AuraEnabled public List<OrderHistoryItem> orderedItems {get; set;}
        @AuraEnabled public Order order {get; set;}
    }

    public class OrderHistoryItem{
        @AuraEnabled public OrderItem orderItem {get; set;}
        @AuraEnabled public List<String> orderItemsImages {get; set;}
    }

    @AuraEnabled
    public static List<OrderHistoryData> getOrderHistory() {
        String userId = UserInfo.getUserId();
        List<Order> orders = [SELECT OrderNumber, EffectiveDate, Status, TotalAmount,
                (SELECT Product2.Id, Quantity, Product2.Name, UnitPrice, Product2.Display_Image__c FROM OrderItems)
                FROM Order
                WHERE OwnerId = :userId
                ORDER BY OrderNumber DESC
        ];

        List<ContentDocumentLink> links = getProductsImages(orders);

        List<OrderHistoryData> orderHistory = new List<ZK_OrderHistoryController.OrderHistoryData>();
        for (Order order : orders) {
            OrderHistoryData pos = new OrderHistoryData();
            pos.order = order;
            List<OrderHistoryItem> products = new List<ZK_OrderHistoryController.OrderHistoryItem>();
            for (OrderItem orderItem : order.OrderItems) {
                OrderHistoryItem productData = new OrderHistoryItem();
                productData.orderItem = orderItem;
                productData.orderItemsImages = getProductImagesIds(links, orderItem.Product2.Id);
                products.add(productData);
            }
            pos.orderedItems = products;
            orderHistory.add(pos);
        }
        System.debug(orderHistory);
        return orderHistory;
    }

    public static List<ContentDocumentLink> getImages(Set<Id> productIds){
        return [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId IN :productIds];
    }


    private static List<ContentDocumentLink> getProductsImages(List<Order> orders) {

        Set<Id> productIds = new Set<Id>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.OrderItems) {
                Id id = orderItem.Product2.Id;
                if (!productIds.contains(id)){
                    productIds.add(id);
                }
            }
        }
        List<ContentDocumentLink> productImages = getImages(productIds);
        return productImages;
    }

    private static List<String> getProductImagesIds(List<ContentDocumentLink> links, Id productId) {
        List<String> ids = new List<String>();
        for (ContentDocumentLink link : links) {
            if (link.LinkedEntityId == productId) {
                ids.add(link.ContentDocumentId);
            }
        }
        return ids;
    }



}