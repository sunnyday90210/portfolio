const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "279322d667f307",
    pass: "195d5d728266ad"
  }
});

module.exports = (name, email, message) => {
  const mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: "robertjohnwollny@gmail.com", // list of receivers
    subject: "Contact request", // Subject line
    text: message, // plain text body
    html: `
    <h1>Contact Request</h1>
    <h3>From ${name}</h3>
    <h3>Email ${email}</h3>

    <p>${message}</p>
    ` // html body
  };

  return transport.sendMail(mailOptions);
};
