const router = require('express').Router();
const handler = require('../utils/handler');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/guia', {
  useMongoClient: true
});

const User = require('../models/pais.model');

module.exports = () => {

    router.get('/', (req, res) => {
        User.find({})
        .sort()
        .exec(handler.handleMany.bind(null, 'pais', res));
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        User.find({_id:id})
        .sort()
        .exec(handler.handleMany.bind(null, 'pais', res));
    });

    return router;
}