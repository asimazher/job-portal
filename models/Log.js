const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Log = sequelize.define('Log', {
    logId: {
        type: DataTypes.UUID,
        primaryKey: true,
        // allowNull: false,
    },
    // logNumber: {
    //     type: DataTypes.INTEGER,
        // primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
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
      header: {
        type: DataTypes.STRING,
      },
    payload: {
        type: DataTypes.JSON, 
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resTime: {
        type: DataTypes.INTEGER,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: true,
       
    },
}, {
    tableName: 'logs',
    timestamps: true, 
});

Log.sync();

module.exports = { Log };