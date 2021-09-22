const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            max:{
                type:Sequelize.INTEGER(10),
                allowNull: true,
                default:10,
            },
            owner:{
                type:Sequelize.STRING(100),
                allowNull: true,
            },
            password:{
                type:Sequelize.DATE,
                default:Date.now,
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Room',
            tableName:'Room',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};