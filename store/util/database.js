const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: '',
// });

// module.exports = pool.promise();
