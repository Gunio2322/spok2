const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')
const credentials = require('./credentials')

const app = express()





  app.use(express.static(__dirname + '/public'))
  app.engine(
    'handlebars',
    expressHandlebars({
      defaultLayout: 'main',
    }),
  )
app.set('view engine', 'handlebars')



app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

const mailTransport = nodemailer.createTransport({
  host: 'gmail',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

// nieco zmodyfikowana wersja oficjalnego wzorca regularnego adresu e-mail ze specyfikacji W3C HTML5:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')


app.post('/cart/checkout', (req, res, next) => {
	const cart = req.session.cart
	if(!cart) next(new Error('Cart does not exist.'))
	const name = req.body.name || '', email = req.body.email || ''
	// walidacja danych wejściowych
	if(!email.match(VALID_EMAIL_REGEX))
		return res.next(new Error('Invalid email address.'))
	// przypisujemy losowy identyfikator koszyka; w normalnej sytuacji należy użyć identyfikatora z bazy danych
	cart.number = Math.random().toString().replace(/^0\.0*/, '')
	cart.billing = {
		name: name,
		email: email,
    
	}
  res.render('email/cart-thank-you', { layout: null, cart: cart },
    (err,html) => {
        // console.log('rendered email: ', html)
        if(err) console.log('error in email template')
        mailTransport.sendMail({
          from: '"Meadowlark Travel": info@meadowlarktravel.com',
          to: cart.billing.email,
          subject: 'Podziękowanie za rezerwację wycieczki w biurze Meadowlark Travel',
          html: html,
          text: htmlToFormattedText(html),
        })
          .then(info => {
            console.log('wysłano! ', info)
            res.render('cart-thank-you', { cart: cart })
          })
          .catch(err => {
            console.error('Nie udało się wysłać potwierdzenia: ' + err.message)
          })
    }
  )
})

app.get('*', (req, res) => {
  // symulacja koszyka
  req.session.cart = {
    items: [
      { id: '82RgrqGCAHqCf6rA2vujbT', qty: 1, guests: 2 },
      { id: 'bqBtwqxpB4ohuxCBXRE9tq', qty: 1 },
    ],
  }
  res.render('04-home')
})

const port = process.env.PORT || 3456
app.listen(port, () => console.log(`\nprzechodzenie na http://localhost:${port}\n`))
