module.exports = function (sequelize, dataTypes) {
    let alias = 'Measures';

    let cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        } ,
        measure :{
            type: dataTypes.INTEGER,
            allowNull: false
        }


        
    }
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    let Measures = sequelize.define(alias, cols, config)
    
    Measures.associate = function(models) {
        /*Measures.belongsTo(models.Marks), {
            as: 'marks',
            foreignKey: 'measures_id'
        },*/
        Measures.hasMany(models.Product), {
            as: 'product',
            foreignKey: 'measures_id'
        }
    }

    return Measures
}