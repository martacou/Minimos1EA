/**
 * Created by Marta_ on 25/11/2016.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var Student = mongoose.model('Student');

var subjectSchema = new Schema({

    name: {type : String},
    students:  [{
        type: Schema.ObjectId, ref: "Student"
    }],
    when: {type : String}
});

module.exports = mongoose.model('Subject', subjectSchema);

