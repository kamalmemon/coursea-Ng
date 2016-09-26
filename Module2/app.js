(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    //To Buy items controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.toBuyItems = ShoppingListCheckOffService.getBuyItems();
        toBuy.checkOutItem = function (itemIndex) {
            ShoppingListCheckOffService.checkOut(itemIndex);
        };
    }

    //Bought items controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
        alreadyBought.checkInItem = function (itemIndex) {
            ShoppingListCheckOffService.checkIn(itemIndex);
        };
    }

    //List of the items to be used in the app
    function getItemsList(){
        var itemsArray = [
            { name: "Cookies", quantity: 8 },
            { name: "Mints", quantity: 15 },
            { name: "Toffees", quantity: 10 },
            { name: "Candies", quantity: 8 },
            { name: "Chocolate Bars", quantity: 5 },
        ]; 
        return itemsArray;
    };

    //Shopping List Check Off Service definition
    function ShoppingListCheckOffService() {
        var service = this;
        
        // Array of the items to be bought, it gets the list from getItemsList()
        service.buyItems = getItemsList();

        // Array for the bought items
        service.boughtItems = [];

        // Push the item in boughtItems array and removes it from buyItems array
        service.checkOut = function (index) {
            service.boughtItems.push(service.buyItems[index]);
            service.buyItems.splice(index, 1);
        };

        // Push the item in buyItems array and removes it from boughtItems array
        service.checkIn = function (index) {
            service.buyItems.push(service.boughtItems[index]);
            service.boughtItems.splice(index, 1);
        };

        //Expose buyItems array
        service.getBuyItems = function () {
            return service.buyItems;
        };

        //Expose boughtItems array
        service.getBoughtItems = function () {
            return service.boughtItems;
        };
    }

}
)();
