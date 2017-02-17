//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app) {
    //app.get("listen to this url")
    //req adn res passed with express library, req include timesstamp cookies headers ect from client

    //res is the response to client, like arrays , json objects, etc
    app.get("/api/user", findUserByCredentials);

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var user=users.find(function(u){
            return u.username==username &&
                    u.password==password;
        });
        res.send(user)
    }
};