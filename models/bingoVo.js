const Sequelize = require('sequelize');

module.exports = class bingoVo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nickname:{
                type:Sequelize.STRING(100),
                allowNull: true,
            },
            score:{
                type:Sequelize.INTEGER(100),
                allowNull: true,
            },
            del_flag : {
                type: Sequelize.CHAR(1),
                allowNull:false,
                defaultValue:'N'
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'bingoVo',
            tableName:'tb21_game_300_bingo',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};