(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($sce, $location,$routeParams, WidgetService,$scope) {
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                });
        }
        init();

        function renderWidget(widget) {
            vm.widget=widget;
        }

        function getEditorTemplateUrl(type) {

            return 'views/Widget/template/editor/widget-'+type+'.view.client.html';
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function updateWidget(widget) {
            if(!$scope.widgetEdit.$pristine) {

            WidgetService
                .updateWidget(widget,vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
            }else{
                console.log("updated contr");
                $scope.widgetEdit.submitted = true;
                vm.error = "Form incomplete";
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                vm.error="Could Not Delete";
            });

        }
    }
})();