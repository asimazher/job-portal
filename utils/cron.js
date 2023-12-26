const fs = require('fs').promises;
// const path = require('path');
const { Applicant } = require('../models/Applicant');


exports.cronJob = async () => {
  try {
    const rejectedApplicants = await Applicant.findAll({
      where: {
        status: 'rejected',
        isDelete: false
      },
    });
    for (const rejectedApplicant of rejectedApplicants) {
    //   console.log(rejectedApplicant)
      try {
        await rejectedApplicant.update({ isDelete: true });
        const fileName = rejectedApplicant.cv;
        if (fileName) {
          const filePath = fileName
          await fs.unlink(filePath);
          console.log(`Applicant with ${rejectedApplicant.applicantId} id is soft deleted,@???@ and files deleted successfully.`);
        } else {
          console.error(`Error deleting files: fileName is undefined for job with id ${rejectedApplicant.applicantId}`);
        }
      } catch (updateError) {
        console.error('Error updating record:', updateError);
      }
    }
    console.log('Rejected Files Deleted.');

  } catch (error) {
    console.error('Error executing cron job:', error);
  }
};
