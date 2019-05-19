const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (req, res, next) {
    console.log("enter user router");
    next();
});
router.route('/')
    .post(function(req, res){
        console.log("creating a new user");
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.password = req.body.password;
        user.save(function(error){
            if(error){
                res.send(error);
            }
            res.json({message: "User create successfully!"});
        })
    })
    .get(function (req, res) {
        console.log("get all the users");
        User.find(function (error, users) {
            if (error) {
                res.send(error);
            }
            res.json(users);
        });
    });
    router.route('/:user_id')
    .delete(function(req, res){
        console.log("delete this user: " + req.params.user_id);
        User.deleteOne({
            _id:req.params.user_id
        }, function(error, user){
            if(error){
                res.send(error);
            }
            res.json({ message: 'Successfully deleted', deletedUser: user });
        });
    });
module.exports = router;
