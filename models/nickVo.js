const Sequelize = require('sequelize');

module.exports = class nickVo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nickname:{
                type:Sequelize.STRING(100),
                allowNull: true,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull: true,
            },
            del_flag:{
                type:Sequelize.CHAR(1),
                allowNull: true,
                defaultValue:'N',
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'nickVo',
            tableName:'tb21_game_100_nickName',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};