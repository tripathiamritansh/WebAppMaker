(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init() {
            vm.newHeader = {
                "_id": "", "widgetType": "HEADER", "pageId": vm.pageId, "size": 0, "text": ""
            };
            vm.newYoutube = {
                "_id": "", "widgetType": "YOUTUBE", "pageId": vm.pageId, "width": "",
                "url": ""
            };
            vm.newHTML = {"_id": "", "widgetType": "HTML", "pageId": vm.pageId, "text": ""};
            vm.newIMAGE = {"_id": "", "widgetType": "IMAGE", "pageId": vm.pageId, "width": "", "url": ""};
        }

        init();

        function createWidget(newWidget) {
            var widget = WidgetService.createWidget(vm.pageId, newWidget);

            $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

    }
})();