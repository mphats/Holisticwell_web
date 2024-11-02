const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if needed

const Feedback = sequelize.define('Feedback', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    userMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: 'feedback'
});

module.exports = Feedback;
