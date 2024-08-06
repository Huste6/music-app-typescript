import nodemailer from "nodemailer"

export const sendMail = (email:String,subject:String,html:String) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, function(err:Error, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
    });
}