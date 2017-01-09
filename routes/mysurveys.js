var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET dashboard page. */

router.get('/', function(req, res, next) {
    if(firebase.auth().currentUser != null){
        var uid = firebase.auth().currentUser.uid;
        var temp = req.query.surveyName;
        var surveyName = temp.split('%').join(' ');

        firebase.database().ref('public/'+uid+'/structure/'+surveyName).once('value').then(function (val) {
            if(val.val() !== null){
                var metadata = val.val();
                firebase.database().ref('public/'+uid+'/responses/'+surveyName).once('value').then(function (val1) {
                    var data = null;
                    if(val1.val() !== null){
                        data = val1.val();
                        res.render("mysurveys",{surveyName:surveyName,metadata:metadata,data:data,uid:uid});
                    }else{
                        res.render("mysurveys",{surveyName:surveyName,metadata:metadata,data:data,uid:uid});
                    }
                });
                
            }else{
                res.send("something went wrong");
            }
        });

    }else{
        res.redirect("/");
    }
});

module.exports = router;
