//module is node.js function, this function can not be accessed from outside
module.exports=function (app, userModel) {
    //app.get("listen to this url")
    //req adn res passed with express library, req include timesstamp cookies headers ect from client

    //res is the response to client, like arrays , json objects, etc
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var q= require('q');

    // var users=[
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    function createUser(req, res) {
        var newUser =req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {

                    res.json(user);
                }, function (error) {
                res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req,res) {
        var userId=req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (success) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // for(var u in users){
        //     if(users[u]._id==userId){
        //         (users.splice(u,1));
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
    function findUser(req,res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(req,res);
        }else if(username){
            findUserByUsername(req,res);
        }
    }

    function findUserByUsername(req,res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                        res.send(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // var user=users.find(function(u){
        //     return u.username==username;
        // });
        // if(user)
        // {
        //     res.send(user);
        // }else{
        //     res.sendStatus(404).send('User not found for username: '+username);
        // }
    }

    function updateUser(req,res) {
        var uid=req.params['userId'];
        var newUser=req.body;
        userModel
            .updateUser(uid,newUser)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for(u in users){
        //     if(users[u]._id==uid){
        //         var newUser=req.body;
        //         users[u].firstName=newUser.firstName;
        //         users[u].lastName=newUser.lastName;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findUserById(req,res) {
        var uid=req.params['userId'];
        userModel
            .findUserById(uid)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for(u in users){
        //     if(users[u]._id==uid){
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send({});
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {

                    res.json(user[0]);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // var user=users.find(function(u){
        //     return u.username==username &&
        //             u.password==password;
        // });
        // if(user)
        // {
        //     res.send(user);
        // }else{
        //     res.sendStatus(503).send('User not found for username: '+username+' and '+password);
        // }
    }
};