const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const joi = require('joi');


const Applicant = sequelize.define('Applicant', {
    applicantId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'applicants',
    timestamps: true,
});


const applicantSchema = joi.object({
    userName: joi.string().trim().max(50).required().regex(/^[a-zA-Z]+$/).message('user name must be valid'),
    email: joi.string().required().regex(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).message('Email Must be valid'),
    qualification: joi.string().required(),
    cnic: joi.string().required().length(13).pattern(/^\d+$/).message('CNIC must contain only numbers and be of length 13'),
    address: joi.string().required(),
    phoneNumber: joi.string().length(13).required().pattern(/^\+[0-9]+$/).message('Phone number must start with "+" and contain only digits after that'),
    status: joi.valid('pending', 'accepted', 'rejected').required(),
    cv: joi.string().required(),
    age: joi.number().integer().required().min(0).max(120),
}).options({ stripUnknown: true });;

Applicant.beforeValidate(async (applicant, options) => {
    try {
        await applicantSchema.validateAsync(applicant);
    } catch (error) {
        throw new Error(error.details.map(detail => detail.message).join(', '));

    }
});

Applicant.sync();

module.exports = { Applicant };