/**
 * Created by Amritansh on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',flickrImageSearchController);

    function flickrImageSearchController($location,$routeParams, FlickrService,WidgetService) {
        var vm=this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.searchPhotos=searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                });
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;

                },function (error) {

                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url=url;
            WidgetService
                .updateWidget(vm.widget,vm.widget._id)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function (error) {

                    vm.error="Failed to add flickr image";
                });
        }
    }
})();