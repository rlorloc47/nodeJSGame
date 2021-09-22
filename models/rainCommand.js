const Sequelize = require('sequelize');

module.exports = class RainCommand extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            command : {
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
            modelName:'RainCommand',
            tableName:'RainCommand',
            paranoid:false,
            charset:'utf8',
        });

    }
    static associate(db){}
};