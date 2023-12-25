const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Message = sequelize.define('ChatMessage', {
  messageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('user', 'bot'),
        allowNull: false,
    },
},{
  tableName: 'messages',
  timestamps: true, 
});

sequelize.sync();

module.exports = { Message }