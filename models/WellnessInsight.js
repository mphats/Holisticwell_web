const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize connection

const WellnessInsight = sequelize.define('WellnessInsight', {
    insight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // assumes `users` table exists
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    sleep_hours: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true
    },
    stress_level: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mood: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    heart_rate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hydration_level: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true
    },
    recorded_at: {
        type: DataTypes.DATE,  // Corrected data type for timestamp
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'wellnessinsights',
    timestamps: false
});

module.exports = WellnessInsight;
