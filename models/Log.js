const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Log = sequelize.define('Log', {
    logId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    host: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reqId: {
        type: DataTypes.STRING,
      },
    reqHeader: {
        type: DataTypes.STRING,
      },
    payload: {
        type: DataTypes.JSON, 
        allowNull: true,
    },
    reqBy: {
        type: DataTypes.STRING,
      },
    resHeader: {
        type: DataTypes.STRING,
      },
    resTime: {
        type: DataTypes.INTEGER,
      },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'logs',
    timestamps: true, 
});

Log.sync();

module.exports = { Log };