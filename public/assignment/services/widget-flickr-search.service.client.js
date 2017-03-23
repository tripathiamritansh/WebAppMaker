/**
 * Created by Amritansh on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos": searchPhotos
        }
        return api;

        function searchPhotos(searchTerm) {
            var key = "1421d106d8a0d712500f1ddcd842b2d3";
            var secret = "589330c6d57c8e05";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            console.log(url);
            return $http.get(url);
        }
    }
})();
