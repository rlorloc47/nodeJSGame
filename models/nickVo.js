const Sequelize = require('sequelize');

module.exports = class nickVo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            sessionID:{
                type:Sequelize.STRING(10),
                allowNull: true,
            },
            nickname:{
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
            tableName:'tb21_game_nickName',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};