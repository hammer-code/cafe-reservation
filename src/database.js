var Sequelize = require('sequelize');

var sequelize = new Sequelize('cafe-reservation', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Cafe = sequelize.define('cafes', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = {
  Cafe: Cafe,
};
