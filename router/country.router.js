const router = require('express').Router();
const handler = require('../utils/handler');
const mongoose = require('mongoose');
var status = require('http-status');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/countries', {
    useMongoClient: true
});

const User = require('../models/country.model');
const { NETWORK_AUTHENTICATION_REQUIRED } = require('http-status');

module.exports = () => {

    router.get('/', (req, res) => {
        User.find({})
            .sort()
            .then(countries => {
                if (countries.length > 0) {
                    console.log(countries);
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: countries
                    });
                } else {
                    res.status(status.NOT_FOUND)
                        .json({
                            code: status.NOT_FOUND,
                            msg: 'No se encontraron elementos'
                        });
                }
            })
            .catch(err => {
                res.status(status.BAD_REQUEST)
                    .json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    });
            });

        /*.exec(
            function (error, countries) {
                if (error) {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición'
                        });
                }
                else if (countries.length > 0) {
                    console.log(countries);
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: countries
                    });
                } else {
                    res.status(status.NOT_FOUND)
                        .json({
                            code: status.NOT_FOUND,
                            msg: 'No se encontraron elementos'
                        });
                }
            }
 
        )*/
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        User.findOne({ _id: id })
            .then(country => {

                if (country)
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: country
                    });
                else
                    res.status(status.NOT_FOUND)
                        .json({
                            code: status.NOT_FOUND,
                            msg: 'No se encontraron elementos'
                        });
            })
            .catch(err => {
                res.status(status.BAD_REQUEST)
                    .json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    });
            })
    });

    router.post('/', (req,res)=> {
        user = req.body;
        User.create(user)
        .then(data => {
            res.json({
                code: status.OK,
                msg: 'Se insertó correctamente',
                data: data
            });
        })
        .catch(
            err => {
                res.status(status.BAD_REQUEST)
                    .json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    });
            }
        )
    });

    router.put('/:id', (req, res)=> {
        _id = req.params.id;
        newData = req.body;
        User.findByIdAndUpdate(_id, newData, {new: true})
        .then( (data) => {
            console.log(data);
            res.json({
                code: status.OK,
                msg: 'Se actualizó correctamente',
                data: data
            });
        })
        .catch(
            err => {
                res.status(status.BAD_REQUEST)
                    .json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    });
            }
        )
    });

    router.delete('/:id', (req, res) => {
        _id = req.params.id;
        User.findByIdAndRemove(_id)
        .then(
            (data) => {
                console.log(data);
                res.json({
                    code: status.OK,
                    msg: 'Se eliminó correctamente',
                    data: data
                });
            }
        )
        .catch(
            err => {
                res.status(status.BAD_REQUEST)
                    .json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    });
            }
        )
    })

    return router;
}