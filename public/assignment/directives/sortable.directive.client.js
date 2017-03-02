(function () {
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", sortableDir);

    function sortableDir($routeParams, WidgetService){

        function linkFunc(scope, element, attributes) {
            var startIndex;
            var pageId=$routeParams.pid;
            element.sortable({
                axis:'y',
                cursor: "move",

                start:function(event,ui){
                    startIndex=ui.item.index();

                },
                stop:function(event, ui){
                    var ei=ui.item.index();
                    WidgetService
                        .widgetUpdateOrder(pageId,startIndex,ei)
                        .success(function () {
                            console.log("Widget Updated");
                        })
                        .error(function () {
                            console.log("update error");
                        });
                }

            });
        }
        return{
            link:linkFunc
        };
    }

})();