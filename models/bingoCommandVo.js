const Sequelize = require('sequelize');

module.exports = class bingoCommandVo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            bingoCommand : {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            bingoDesc : {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            bingoDescCode : {
                type: Sequelize.STRING(100),
                allowNull: false,
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
            modelName:'bingoCommandVo',
            tableName:'tb21_game_310_bingoCommand',
            paranoid:false,
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
        });

    }
    static associate(db){}
};