export default function (req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    port: process.env.PORT,
    host: process.env.HOST,
    auth: { user: process.env.AUTH_USER, pass: process.env.AUTH_PASS },
    secure: true,
  });

  const mailData = {
    from: "coolmady374@gmail.com",
    to: "coolmady374@gmail.com",
    subject: `Message From ${req.body.name}`,
    text:
      "COMPANY NAME:" +
      req.body.companyname +
      " | Sender email Address: " +
      req.body.email +
      " | Sender Name  : " +
      req.body.name +
      " | Sender Address  : " +
      req.body.address +
      "MESSAGE:" +
      req.body.message +
      " |Phone No: " +
      req.body.phoneno,
    html: `<div>${req.body.companyname}</div>
    <div>${req.body.email}</div>
    <div>${req.body.name}</div>
    <div>${req.body.address}</div>
    <div>${req.body.message}</div>
    <div>${req.body.phoneno}</div>
    <p>Sent from: ${req.body.email}</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  console.log(req.body);
  res.send("success");
}
