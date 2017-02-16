(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);
    
    function userService() {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api={
            "updateUser":updateUser,
            "createUser":createUser,
            "deleteUser":deleteUser,
            "findUserByCredentials":findUserByCredentials,
            "findUserById": findUserById
        };

        return api;

        function deleteUser(userId){
            for(var u in users){
                if(users[u]._id==userId){
                    users.splice(u,1);
                }
            }
        }
        function createUser(user){
            user._id=(new Date()).getTime().toString();
            users.push(user);
            return user;
        }
        function updateUser(userId,newUser) {
            for (u in users){
                if(users[u]._id==userId){
                    users[u].firstName=newUser.firstName;
                    users[u].lastName=newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }
        function findUserById(uid) {
            for(u in users){
                if(users[u]._id==uid){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }
        function findUserByCredentials(username , password){
            for(u in users){
                if(users[u].username==username && users[u].password==password){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

    }
})();