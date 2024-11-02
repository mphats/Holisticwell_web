   const { Sequelize } = require('sequelize');

// MySQL Database Configuration
const sequelize = new Sequelize('holisticwell360_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
