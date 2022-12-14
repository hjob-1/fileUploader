const { Sequelize } = require('sequelize');


 const sequelize = new Sequelize('file', "Eyob-tad", '759864job', {
  host: 'localhost',
  dialect:'mariadb'});

 
export default sequelize;

  