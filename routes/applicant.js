const express = require("express");
const { submitApplication, populateReqBody } = require("../controllers/applicant");

const applicantRouter = express.Router();

// Register User

applicantRouter.post("/submitform", populateReqBody, submitApplication);

// applicantRouter.patch("/setPassword/:token?", resetPassword);


// applicantRouter.post("/login", loginUser);

// applicantRouter.post("/forgot-password", forgotPassword);


module.exports = applicantRouter;
