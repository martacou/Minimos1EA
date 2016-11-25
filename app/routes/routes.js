/**
 * Created by Marta_ on 25/11/2016.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Student = require('../models/Student.js');
    var Subject = require('../models/Subject.js');
    var User = require('../models/Student.js');

    //GET all users

    allSubjects = function (req,res){
        console.log("alSubjects");
        Subject.find(function(err,subjs){
            if (err) res.send(500, err.message);
            Student.populate(subjs,{path: "students"},function(err,subjs){
                console.log('GET all subjects');
                console.log(subjs);
                res.status(200).json(subjs);
            });

        });
    };

    addSubject = function(req,res) {
        console.log("addSubject");
        var subject = new Subject({
            name: req.body.name,
            students:[],
            when: req.body.when
        });
        console.log(req.body.name);

        subject.save(function (err, subj) {
            if (err) return  console.log("Imposible crear");
            res.status(200).json(subj);

        });
    }
    //GET - Get only a user


    addUser = function (req, res) {
        console.log(req.body.phones);
        console.log(" addUser");
        var student = new Student({

            name: req.body.name,
            address: req.body.address,
            phones: [{name:req.body.phonename, number:req.body.phonenum}],
        });

        student.save(function (err, student) {
            if (err) return res.send(500, err.message);
            res.status(200).json(student);

        });
    };

    getAllUsers = function (req, res) {
        console.log("getAllUsers ");
        Student.find(function (err, users) {
            if (err) res.send(500, err.message);
            console.log('GET /students');
            console.log(users);
            res.status(200).json(users);
        });
    };



    getUser = function(req, res){
        console.log(" getUser");
        var id = req.params.user_id;
        Student.findById(id, function(err, student){
            if(err)
                res.send(err)
            res.send(student);
        });
    }

    //Obtener subjects populando estudiantes
    getSubject = function(req, res){
        console.log("getSubject ");
        var id = req.params.subject_id;
        Subject.findById(id).populate('students').exec().then(function(err, subject){
            if(err)
                res.send(err)
            res.send(subject);
        });
    };

    addUserToSubj = function (req, res) {
        console.log(" addUserToSubj");
        console.log('PUT');
        var query = {_id: req.params.subject_id};
        var update = {$addToSet: {"students": req.body.student_id}};
        var options = {};

        Subject.findOneAndUpdate(query, update, options, function (err, subject) {
            if(err){
                res.send(err);
            }
            if(subject){
                Subject.findById(subject._id).populate('students').exec().then(function(err, subject){
                    if(err)
                        res.send(err);
                    res.send(subject);
                });
            }
        });

    };

    deleteSubject = function(req, res) {
        console.log("deleteSubject");
        Subject.remove({_id:req.params.subject_id},
            function (err, subject) {
                if(err)
                    res.send(err);
                Subject.find(function(err, subjects) {
                    if(err)
                        res.send(err)
                    res.send(subjects);
                });
            });
    };

    deleteUser = function(req, res) {
        console.log("deleteUser");
        Student.remove({_id:req.params.user_id},
            function (err, student) {
                if(err)
                    res.send(err);
                Student.find(function(err, student) {
                    if(err)
                        res.send(err)
                    res.send(student);
                });
            });
    };

    deleteStudentSubject = function(req, res) {
        console.log("delete User in Subject");
        var query = {_id:req.params.subject_id};
        var update = {$pull : {"students" : req.params.user_id}};
        var options = {};
        Subject.findOneAndUpdate(query, update, options, function(err, subject){
            if(err) {
                res.send(err);
            }
            if(subject){
                Subject.findById(subject._id).populate('students').exec().then(function(err, subject){
                    if(err)
                        res.send(err)
                    res.send(subject);
                });
            }
        });
    };

    addPhone = function(req, res){
        var query = {_id: req.params.student_id};
        var update = {$addToSet : {"phones" :{name: req.body.phonename, number: req.body.phonenum}}};
        var options = {};
        Student.findOneAndUpdate(query, update, options, function(err, student) {
            if (err) {
                res.send(err);
            }
            if(student){
                Student.findById(student._id).populate('phones').exec().then(function(err, student) {
                    if (err)
                        res.send(err)
                    res.send(student);
                });
            }
    })};

    deletePhone = function(req, res){

        console.log("delete phone!!!!!! ");
        var query = {_id: req.params.student_id};
        var update = {$pull : {"phones":{ _id: req.params.phone_id}}};
        var options = {};
        Student.findOneAndUpdate(query, update, options, function(err, student) {
            if (err) {
                res.send(err);
            }
            if(student){
                Student.findById(student._id).populate('phones').exec().then(function(err, student) {
                    if (err)
                        res.send(err)
                    res.send(student);
                });
            }
        });
    };


    app.get('/subjects', allSubjects);
    app.post('/students', addUser);
    app.get('/students/:user_id',getUser);
    app.get('/students', getAllUsers);
    app.get('/subjects/:subject_id', getSubject);
    app.post('/subjects',addSubject);
    app.put('/subjects/:subject_id',addUserToSubj);
    app.delete('/subjects/:subject_id', deleteSubject);
    app.delete('/students/:user_id', deleteUser);
    app.delete('/subjects/:subject_id/:user_id', deleteStudentSubject);
    app.post('/students/addphone/:user_id', addPhone);
    app.delete('/students/deletephone/:user_id/:phone_id', deletePhone);
}