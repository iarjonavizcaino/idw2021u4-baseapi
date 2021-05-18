/**
 * Created by desarrollo-001 on 31/08/17.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('Country', schema, 'country');

module.exports = userModel;