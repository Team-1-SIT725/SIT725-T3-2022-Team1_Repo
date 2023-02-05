const nodemailer = require("nodemailer");
const handlebars = require("handlebars"); //used for sending the email messages
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const User = require("../models/User");

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    // the function reuires the email host, username and password stored in the .env file
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD 
      },
    });

    //this section points the email path to look at the template which is located in the same directory.
    //each email is then sent based on the one called in the service.js file
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
     //the email is that of the user making the request and the subject is located in the service.js, e.g is in line 36 of service.js file
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
       console.log(error);
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;