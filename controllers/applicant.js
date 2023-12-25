const multer = require('multer');
const { Applicant } = require('../models/Applicant');
const express = require('express');
const uuid = require('uuid');

const app = express();

app.use(express.json());

exports.populateReqBody = (req, res, next) => {
    // req.body.userName = req.body.userName;
    console.log('userName set to:', req.body);
    next();
  };


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const { userName } = req.body;
    // const fileName = file.originalname;

// Use the original file extension from the uploaded file
const fileExtension = file.originalname.split('.').pop();

// Construct the filename with a unique identifier and the original file extension
const fileName = `applicant-${uuid.v4()}-CV.${fileExtension}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });


  
exports.submitApplication = async (req, res) => {

    try {
        // Apply the populateReqBody middleware before the upload.single('cv') middleware
        this.populateReqBody(req, res, () => {
          // Continue to the next middleware, which is the upload.single('cv') middleware
          upload.single('cv')(req, res, async (err) => {
            // Handle file upload errors
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'File upload error' });
            }

  try {
    const {
      userName,
      email,
      qualification,
      cnic,
      address,
      phoneNumber,
      status,
      age,
      isDelete,
    } = req.body;

    console.log(req.body.userName)
    const cvFileName = req.file.filename;
console.log(req.file.path)
    // Save application data to the database
    const newApplicant = await Applicant.create({
    applicantId: uuid.v4(),
      userName,
      email,
      qualification,
      cnic,
      address,
      phoneNumber,
      cv: cvFileName,
      status,
      age,
      isDelete,
    });

    await newApplicant.save();

    res.json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
});
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal Server Error' });
}
};
