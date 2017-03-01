(function () {
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", sortableDir);

    function sortableDir(){
        function linkFunc(scope,element) {
            element.sortable({
                start:function(event,ui){
                    ui.item.startlocation=ui.item.index();
                },
                update:function(event, ui){
                    var si=ui.item.startlocation;
                    var ei=ui.item.index();
                    sortableController.widgetsSort(si,ei);
                },
                axis:'y',
                cursor:"move"
            });
        }
        return{
            link:linkFunc,
            controller: sortableController
        };
    }

    function sortableCOntroller(WidgetService,$routeParams) {
        var vm =this;
        vm.wSort=wSort;

        function wSort(start,end){
            var pageId=$routeParams.pid;
            WidgetService
                .updateWidgetOrder(pageId,start,end)
                .success()
                .error();
        }
    }
})();