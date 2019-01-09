const nodemailer = require('nodemailer');
const config = require("./config.json");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: config.auth.username,
        pass: config.auth.password
    }
});

const mailOptions = {
    from: config.mail.from,
    subject: config.mail.subject,
    text: config.mail.text
  };
  

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('email.txt')
  });
  
  lineReader.on('line', function (line) {
    mailOptions.to = line.trim();
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  });