//module is node.js function, this function can not be accessed from outside

module.exports=function (app, userModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID     : '1828253887436933',
        clientSecret : '77daabdde63e782601d39ac175c5b27e',
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));
    //app.get("listen to this url")
    //req adn res passed with express library, req include timesstamp cookies headers ect from client

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    //res is the response to client, like arrays , json objects, etc
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    var q= require('q');

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                    if(user){
                        return done(null, user);
                    }else{
                        var displayName = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username : displayName[0],
                            firstName: displayName[0],
                            lastName: displayName[1],
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if(err){
                        return done(err);
                    }
                })
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if(err){
                        return done(err);
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        password=password.toString();
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user.length!=0) {
                        console.log(user);
                        user = user[0];
                        console.log(user);
                        if (user && bcrypt.compareSync(password, user.password)) {
                            console.log("c1");
                            return done(null, user);
                        } else {
                            console.log("local :" + user);
                            return done(null, false);
                        }
                    }else{
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register(req,res) {
        var user=req.body;
        user.password=bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

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
        console.log(username);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                        console.log("fun :"+user);
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