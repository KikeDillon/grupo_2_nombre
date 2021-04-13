const { readFileSync } = require('fs');
const path = require('path');
const fs = require ('fs');

let db = require('../database/models');

const cssAdminIndex = ['footer', 'header', 'tablet', 'admin/adminIndex'];
const cssAdminView = ['footer', 'header', 'tablet', 'admin/adminView'];
const cssAdminDelete = ['footer', 'header', 'tablet', 'admin/adminDelete'];
const cssAdminCreate = ['footer', 'header', 'tablet', 'admin/adminCreate'];
const cssAdminEdit = ['footer', 'header', 'tablet', 'admin/adminEdit'];

const adminController = {
    admin: function(req, res) {
        db.Products.findAll()
        .then(Products => {
            res.render('adminIndex.ejs', {products})
        })
    },
    view: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(products => {
                res.render('adminView.ejs', {products});
            });
    },
    save: function(req, res) {
        db.Products.create({
            id: req.body.id,
            models_id: req.body.mark,
            measure_id: req.body.size,
            price: req.body.price,
            outlet: req.body.outlet == 1? 1 : 0,
            //stock: req.body.stock
        })
        return res.redirect('/administrar');
    }, 
    edit:  (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(products => {
                res.render('adminEdit.ejs', {products});
            });
    },
    update: (req, res) => {
        db.Products.update({
            id: req.body.id,
            models_id: req.body.mark,
            measure_id: req.body.size,
            price: req.body.price,
            outlet: req.body.outlet == 1? 1 : 0,
            //stock: req.body.stock
        },
        {where: {id: req.params.id}}
        ) 
        res.redirect('/administrar')
    },
    delete:  (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(products => {
                res.render('adminDelete.ejs', {products});
            });
    },
    detroy:  (req, res) => {
        db.Products.detroy({
            where: { id: req.params.id}
           }
        )
        res.redirect('/administrar')
    }
}

module.exports = adminController;




/*admin: function (req,res){
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        res.render (path.resolve(__dirname, '../views/web/admin/adminIndex.ejs'), {styles: cssAdminIndex, products});
    },
    view: function (req, res){
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let unProducto = null;
        products.forEach(i => {
            if (i.id == req.params.id){
                unProducto = i;
            }
        });
        res.render (path.resolve(__dirname, '../views/web/admin/adminView.ejs'), {styles: cssAdminView, unProducto})
    },
    create: function (req, res){
        let perfumeM = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/mark.json')));
        return res.render (path.resolve(__dirname, '../views/web/admin/adminCreate.ejs'), {styles: cssAdminCreate, perfumeM});
    },
    save: function (req, res){
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let lastProduct = products.pop();
        products.push(lastProduct);
        let newPerfume = {
            id: lastProduct.id + 1,
            mark : req.body.mark,
            model: "pendiente",
            price: req.body.price,
            outlet: req.body.outlet == 1? 1 : 0,
            size: req.body.size,
            gender: req.body.gender,
            image: req.file.filename
        }
        products.push(newPerfume);
        let newPerfumeSave = JSON.stringify(products,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'), newPerfumeSave);
        return res.redirect('/administrar');
    },
    edit: function (req,res){
        let perfumeM = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/mark.json')));
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let unProducto = null;
        products.forEach(i => {
            if (i.id == req.params.id){
                unProducto = i;
            }
        });
        return res.render (path.resolve(__dirname, '../views/web/admin/adminEdit.ejs'), {styles: cssAdminEdit, unProducto, perfumeM})
    },
    update: function (req, res){
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        perfumeId = req.params.id;
        let newArrayPerfume = products.map(function (i){    
            if (i.id == perfumeId){
                oldImage = i.image;
                let newPerfume = {
                    id: perfumeId,
                    mark : req.body.mark,
                    model: "pendiente",
                    price: req.body.price,
                    outlet: req.body.outlet == 1? 1 : 0,
                    size: req.body.size,
                    gender: req.body.gender,
                    image: req.file? req.file.filename : oldImage
                }
                return newPerfume;         
            }
            return i;
        });
        let newPerfumeSave = JSON.stringify(newArrayPerfume,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'), newPerfumeSave);
        return res.redirect('/administrar');
    },
    delete: function (req,res){
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let unProducto = null;
        products.forEach(i => {
            if (i.id == req.params.id){
                unProducto = i;
            }
        });
        return res.render (path.resolve(__dirname, '../views/web/admin/adminDelete.ejs'), {styles: cssAdminDelete, unProducto})
    },
    destroy: function (req,res){
        let products = JSON.parse (fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let perfumeDeleteId = req.params.id;
        let perfumeNewFile = products.filter(function(i){
            return (i.id != perfumeDeleteId);
        });
        let perfumeSave = JSON.stringify(perfumeNewFile,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'),perfumeSave);
        return res.redirect('/administrar');
    }*/
