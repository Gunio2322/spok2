require('dotenv').config()
const http = require('http');
const util = require('util');
const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars').engine
const PORT = process.env.PORT || 3300
const app = express()
const multiparty = require('multiparty')
const handlers = require('./lib/handlers')
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const nodemailer = require('nodemailer')
const { Console } = require('console');
const flashMiddleware = require('./lib/middleware/flash')
const flash = require('connect-flash');

// Pliki statyczne
app.use(express.static(__dirname + '/public'))


app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  }),
)
app.set('view engine', 'handlebars')

// do sprawdaznia formulaza czy response jest prawidłowy
app.use(bodyParser.urlencoded({extended: true}))


// COOKIES

app.use(cookieParser(credentials.cookieSecret))

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

app.use(flashMiddleware)




// Strona glowna
app.get('/', (req, res) => {res.render('home')

})

// funkcja do obsługi formulaza
app.get('/formulaz', (req, res) => {
res.render('formulaz', {csrf: 'miejsce na token csrf'})
})
// wysylanie POST bo to moment "proces"
app.post('/formulaz/process', (req, res, next) => {

 if(true){
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'komunikat flash =>The email address you entered was not valid.',
    }
  }
    res.redirect(303, '/thanks', )

  })

 


app.get('/thanks', (req, res) => res.render('thanks'))

// formulaz za pomoca fetch
app.get('/formFetch', (req, res) => res.render('formFetch'))
app.post('/api/formFetch', (req, res) => {
})

// Przesyłanie plikow przez przeglądarke

app.get('/imgBrow', (req, res) => res.render('imgBrow', {csrf: 'miejsce na token csrf'} ))


app.post('/imgBrow/process', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
   
if(err) return res.status(500).send({message: err.message})

    res.redirect(303, '/thanks')
})
})
// przesylanie plikow FETCH
app.get('/imgFetch', (req, res) =>  res.render('imgFetch', {csrf: ''} ))



// Kontakt
app.get('/kontakt', (req, res) => {
  res.type('text/html')
  res.render('kontakt')
})



app.get('/newsletter', (req, res) => res.render('newsletter'))
app.get('/newsletter-archive', (req, res) => res.render('newsletterArchive'))
app.get('/newsletter-signup', (req, res) => res.render('newsletterSignup', { csrf: 'miejsce na token CSRF' }))

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

app.post('/newsletter-signup/process', (req, res) => {
  const name = req.body.name || '', email = req.body.email || ''
  // walidacja danych wejściowych
  if(!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'komunikat flash =>The email address you entered was not valid.',
    }
    return res.redirect(303, '/newsletter-signup')
  }

  new NewsletterSignup({ name, email }).save((err) => {
    if(err) {
      req.session.flash = {
        type: 'danger',
        intro: 'Błąd bazy danych!',
        message: 'Wystąpił błąd bazy danych; spróbuj ponownie później.',
      }
      return res.redirect(303, '/newsletter/archive')
    }
    req.session.flash = {
      type: 'success',
      intro: 'Dziękujemy!',
      message: 'Zarejestrowałeś się na newsletter.',
    };
    return res.redirect(303, '/newsletter-archive')



})
})

// Niestandardowa strona 404
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Nie znaleziono')
})
// Niestandardowa strona 500
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - server wyjebał sie')
})
// nasluchiwanie servera
app.listen(PORT, () => console.log(`server start 3300`))
