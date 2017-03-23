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
                "widgetType": "HEADER", "_page": vm.pageId, "size": 0, "text": ""
            };
            vm.newYoutube = {
                "widgetType": "YOUTUBE", "_page": vm.pageId, "width": "",
                "url": ""
            };
            vm.newHTML = {"widgetType": "HTML", "_page": vm.pageId, "text": ""};
            vm.newIMAGE = {"widgetType": "IMAGE", "_page": vm.pageId, "width": "", "url": ""};
            vm.newText={"widgetType": "TEXT","_page": vm.pageId, "text":"", "rows": 0, "placeholder":"", "formatted":false};
        }
        init();

        function createWidget(newWidget) {

             WidgetService
                 .createWidget(vm.pageId, newWidget)
                 .success(renderWidget);

        }
        function renderWidget(widget) {

            $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }
    }
})();