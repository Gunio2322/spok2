const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')
const credentials = require('./credentials')
const PORT = 3455
const app = express()







  app.use(express.static(__dirname + '/public'))
  app.engine(
    'handlebars',
    expressHandlebars({
      defaultLayout: 'main',
    }),
  )
app.set('view engine', 'handlebars')
app.get('/', (req, res) => res.render('home'))




async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          // user: "emma.pouros64@ethereal.email", // generated ethereal user
          user: credentials.sendgrid.user,
pass: credentials.sendgrid.password
          // pass: "KGARaJgDQg8bh1H7SA", // generated ethereal password
        },
      });

// send mail with defined transport object
let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello worldekton?", // plain text body
    html: "<b>Hello worldon kutas?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



main().catch(console.error);

// nasluchiwanie servera
app.listen(PORT, () => console.log(`server start 3455`))