/**
 * Created by Marta_ on 25/11/2016.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var studentSchema = new Schema({

    name: {type: String},
    address: {type: String},
    phones: [{
        contact: {type: String},
        number: {type: String}
    }],
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

module.exports = mongoose.model('Student', studentSchema);