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
                    console.log(si);
                    var pageId=$routeParams.pid;
                    WidgetService
                        .widgetUpdateOrder(pageId,start,end)
                        .success(function () {
                            console.log("Widget Updated");
                        })
                        .error(function () {
                            console.log("update error");
                        });
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

    function sortableController(WidgetService,$routeParams) {
        var vm =this;
        vm.wSort=wSort;

        function wSort(start,end){


        }
    }
})();