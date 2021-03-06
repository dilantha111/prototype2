var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/',function (req,res,next) {
    res.render("signin",{title:'login'});
});

router.post('/',function (req,res,next) {
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error,test) {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send(errorMessage);
    }).then(function (user) {
        if(user){
            res.redirect("/dashboard");
        }else{ // if previous user click back button and tries to log again... but provided wrong details
            var prevlog = firebase.auth().currentUser;
            if(prevlog){
                firebase.auth().signOut();
            }
        }
    });

});

module.exports = router;