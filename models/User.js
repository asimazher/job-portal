// models/user.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const joi = require('joi');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rememberToken: {
        type: DataTypes.STRING
        // Add other options or validations as needed
    },
    // timestamp: {
    //     type: DataTypes.STRING
    //     // Add other options or validations as needed
    // }
}, {
    tableName: 'users', // Set the table name if it's different from the model name
    timestamps: true // enable/Disable Sequelize's default timestamps
});

const validateUser = (user)=>{
    const schema = joi.object({
        firstName: joi.string().min(5).max(100).required(),
        lastName: joi.string().min(5).max(100).required(),
        email: joi.string().required().email(),
        password: joi.string().min(8).max(150)
    })
    return schema.validate(user)
}

const validateUserLogin = (user)=>{
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(8).max(150).required()
    })
    return schema.validate(user)
}


module.exports = {User, validateUser, validateUserLogin};
