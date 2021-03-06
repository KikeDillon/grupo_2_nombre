const path = require('path');
const {Products, Marks} = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");
//const moment = require('moment');
//const modelJs = require('../../../public/javascripts/models')

const productsAPIController = {
    index: (req, res) => {
        Marks.findAll()
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        Products.findByPk(req.params.id)
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/:id'
                    },
                    data: products
                }
                res.json(respuesta);
            });
    },
    'productsModels': (req, res) => {
        Products.findByPk(req.params.id,{
            include: ['models']
        })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/:id'
                    },
                    data: products
                }
                res.json(respuesta);
            });
    },
    create: (req,res) => {
        Products.create(
            {
            price: req.body.price,
            outlet: req.body.outlet == 1? 1 : 0,        
            stock: req.body.stock,
            modelId: req.body.modelId,
            markId: req.body.markId,
            genreId: req.body.genreId,
            measureId: req.body.measureId,
            destacado: req.body.destacado == 1? 1 : 0,
            image: req.file.filename
        }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let productId = req.params.id;
        Products.update(
            {
            price: req.body.price,
            outlet: req.body.outlet == 1? 1 : 0,        
            stock: req.body.stock,
            modelId: req.body.modelId,
            markId: req.body.markId,
            genreId: req.body.genreId,
            measureId: req.body.measureId,
            destacado: req.body.destacado == 1? 1 : 0,
            image: req.file.filename
        },
            {
                where: {id: productId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let productId = req.params.id;
        Products.destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/delete/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/delete/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
}

module.exports = productsAPIController;
