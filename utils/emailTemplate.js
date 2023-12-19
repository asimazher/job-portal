


const accountCreationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activation</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Hello {{username}},</h2>

  <p>Welcome to our platform! We're thrilled to have you on board.</p>

  <p>To activate your account, please click the button below:</p>

  <!-- Replace 'http://your-activation-link' with the actual activation link -->
  <a href="{{activationLink}}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Activate Your Account</a>

  <p>If you are having trouble clicking the button, you can also copy and paste the following link into your browser:</p>

  <!-- Display the activation link as plain text -->
  <p>{{activationLink}}</p>

  <p>Thank you for joining us!</p>

</body>
</html>`

const forgotPasswordTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Reset Your Password</h2>

  <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>

  <p>To reset your password, click the button below:</p>

  <!-- Replace 'http://your-reset-password-link' with the actual link for resetting the password -->
  <a href="{{resetPasswordLink}}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>

  <p>If you are having trouble clicking the button, you can also copy and paste the following link into your browser:</p>

  <!-- Display the reset password link as plain text -->
  <p>{{resetPasswordLink}}</p>

  <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>

</body>
</html>
`
const changePasswordTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Changed</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Password Changed Successfully</h2>

  <p>Your password has been changed successfully. If you made this change, you can ignore this email. If you didn't change your password, please contact us immediately.</p>

  <p>If you have any questions or concerns, feel free to reach out to our support team.</p>

  <p>Thank you!</p>

</body>
</html>
`

const pendingStatusTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Status</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Your Job Application is Pending</h2>

  <p>Thank you for applying for the position. Your application is currently under review, and we will get back to you as soon as possible with an update.</p>

  <p>If you have any questions or need further information, feel free to contact our HR department.</p>

  <p>Best regards,</p>
  <p>Your Company Name</p>

</body>
</html>
`

const rejectedStatusTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Status</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Your Job Application was Not Successful</h2>

  <p>We appreciate your interest in the position, but unfortunately, we have chosen not to move forward with your application at this time.</p>

  <p>Thank you for taking the time to apply, and we encourage you to explore other opportunities with us in the future.</p>

  <p>Best regards,</p>
  <p>Your Company Name</p>

</body>
</html>
`

const selectedStatusTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Status</title>
</head>
<body style="font-family: 'Arial', sans-serif;">

  <h2>Congratulations! You've Been Selected</h2>

  <p>We are delighted to inform you that your application has been successful, and we would like to offer you the position. Congratulations!</p>

  <p>Our HR department will reach out to you shortly with further details regarding the next steps in the hiring process.</p>

  <p>Thank you for choosing to be a part of our team!</p>

  <p>Best regards,</p>
  <p>Your Company Name</p>

</body>
</html>
`
module.exports = {accountCreationTemplate, forgotPasswordTemplate, changePasswordTemplate, pendingStatusTemplate, rejectedStatusTemplate, selectedStatusTemplate}