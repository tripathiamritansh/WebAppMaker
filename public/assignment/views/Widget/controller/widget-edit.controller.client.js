(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($sce, $location,$routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getTrustedHtml=getTrustedHtml;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget= deleteWidget;
        vm.updateWidget=updateWidget;
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/Widget/template/editor/widget-'+type+'.view.client.html';
        }
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(widget,vm.widgetId, vm.widget.widgetType);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();