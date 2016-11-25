/**
 * Created by Marta_ on 25/11/2016.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var studentSchema = new Schema({

    name: {type: String},
    address: {type: String},
    phones: [{
        name: String,
        number: String
    }]
});

module.exports = mongoose.model('Student', studentSchema);