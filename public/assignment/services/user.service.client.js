(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);
    //$http help interact with servers remotely, any server google imdb etc
    function userService($http) {

        var api={
            "login":login,
            "logout":logout,
            "register":register,
            "updateUser":updateUser,
            "createUser":createUser,
            "deleteUser":deleteUser,
            "findUserByCredentials":findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };

        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }
        function login(user) {
            return $http.post("/api/login",user);
        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
        function deleteUser(userId){
            return $http.delete('/api/user/'+userId);
        }
        function createUser(user){
            return $http.post("/api/user",user);
        }
        function updateUser(userId,newUser) {
            return $http.put("/api/user/"+userId, newUser);

        }
        function findUserById(uid) {
            return $http.get("/api/user/"+uid);

        }
        function findUserByCredentials(username , password){
            return $http.get("/api/user?username="+username+"&password="+password);
        }

    }
})();