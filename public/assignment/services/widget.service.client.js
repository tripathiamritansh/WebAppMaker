(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);
    
    function WidgetService($http) {
        this.findAllWidgets = findAllWidgets;
        this.findWidgetById = findWidgetById;
        this.deleteWidget =deleteWidget;
        this.updateWidget=updateWidget;
        this.createWidget=createWidget;
        this.widgetUpdateOrder=widgetUpdateOrder;

        function findAllWidgets(pageId) {
           return $http.get("/api/page/"+pageId+"/widget");
        }

        function deleteWidget(wgid) {
            return $http.delete('/api/widget/'+wgid);
        }

        function createWidget(pageId,widget) {
           return $http.post("/api/page/"+pageId+"/widget",widget);
        }

        function updateWidget(widget,wgid) {
            console.log(widget,wgid);
            return $http.put('/api/widget/'+wgid, widget);

        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }
        function widgetUpdateOrder(pageId,si,ei) {

            return $http.put("/api/page/"+pageId+"/widget?initial="+si+"&final="+ei);
        }
    }
})();