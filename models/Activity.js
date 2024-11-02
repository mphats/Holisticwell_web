const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize connection

const Activity = sequelize.define('Activity', {
    activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    activity_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    calories_burned: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    steps_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    activity_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'activities',
    timestamps: false
});

module.exports = Activity;
