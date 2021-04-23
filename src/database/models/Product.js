module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';

    let cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true
            //autoIncrement : true
        } ,
        modelId : {
            type: dataTypes.INTEGER
        } ,
        measureId : {
            type: dataTypes.INTEGER
        } ,
        price :{
            type: dataTypes.INTEGER
        },
        outlet : {
            type: dataTypes.INTEGER
        },
        stock : {
            type: dataTypes.INTEGER
        }

        
    }
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    let Product = sequelize.define(alias, cols, config)

    Product.associate = function(models) {
        Product.belongsTo(models.Models), {
            as: 'models',
            foreignKey: 'models_id'
        },
        Product.belongsTo(models.Measures), {
            as: 'measures',
            foreignKey: 'measures_id'
        }/*,
        Product.belongsTo(models.Carrito), {
            as: 'carrito',
            foreignKey: 'product_id'
        }*/
    }

    return Product
}