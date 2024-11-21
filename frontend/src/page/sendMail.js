// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');

// const app = express();

// app.use(bodyParser.json());

// app.post('/send-email', (req, res) => {
//   const { name, email, message } = req.body; // Assuming these fields are present in req.body

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'reenasris.23mca@kongu.edu', // Replace with your email address
//       pass: '26-Jul-03', // Replace with your email password (consider using environment variables)
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: 'reenasris.23mca@kongu.edu',
//     subject: 'Form Submission',
//     text: `
//       Name: ${name}
//       Email: ${email}
//       Message: ${message}
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error occurred:', error);
//       res.status(500).json({ success: false, message: 'Failed to send email.' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).json({ success: true, message: 'Email sent successfully!' });
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
