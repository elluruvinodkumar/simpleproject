const nodemailer = require('nodemailer');
//constconfig = require('../../../config/db');
const fs = require('fs');

const userOTPSentToMail = async (subject, toEmail, otp) => {
    await fs.readFile('E:/NodePractice/simplenodeapp/config/OtpEmail.html', function (err, data) {
        if (!err) {
            const str = data.toString();
            const html = str.replace("%s", otp);
            sendOTPTOMail(toEmail,subject,html); 
        }
        else {
            console.log(err);
        }
    });       
}

const sendOTPTOMail = (toEmail,subject,html) => {
    const transporter = nodemailer.createTransport({
        //service: config.mailService,
        name:'SMTP',
        host: 'smtp.gmail.com',
        port: 465,
        secure :true,
        auth: {		
        user: 'ae0019369@gmail.com',
        pass: 'Abcd1234@#'
        }
    }); 
    const mailOptions = {
        from: 'contact.spectrum.in@gmail.com',
        to: toEmail,
        subject: subject,
        html: html
    };
     transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email sent: ' + info.response);

        }
    });
    
}

const sendMail = (toEmail,subject,password) => {
    const transporter = nodemailer.createTransport({
            name:'SMTP',
            host: 'smtp.gmail.com',
            port: 465,
            secure :true,
            auth: {		
            user: 'ae0019369@gmail.com',
            pass: 'Abcd1234@#'
            }
    }); 
    const mailOptions = {
        from: 'ae0019369@gmail.com',
        to: toEmail,
        subject: subject,
        text: password
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}

module.exports = {
    userOTPSentToMail,
    sendMail
};