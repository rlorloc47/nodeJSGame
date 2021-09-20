const Sequelize = require('sequelize');

module.exports = class Rain extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            sessionID:{
                type:Sequelize.STRING(10),
                allowNull: true,
            },
            score:{
                type:Sequelize.INTEGER(100),
                allowNull: true,
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Rain',
            tableName:'Rain',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};