const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-markdown');
mongoose.Promise = global.Promise;

module.exports = mongoose;