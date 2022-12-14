import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../dataBaseconnection';

const Files = sequelize.define('Files',{
    name:DataTypes.STRING,
    size:DataTypes.STRING,
    uploadedAt:DataTypes.STRING,
    path:DataTypes.STRING

},{
    freezeTableName: true,

})


sequelize.sync({alter:true});

export default Files;
