require('dotenv').config()
var http = require('http');
var util = require('util');
const { request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const PORT = process.env.PORT || 3300
const app = express()

// Pliki statyczne
app.use(express.static(__dirname + '/public'))


app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  }),
)
app.set('view engine', 'handlebars')



// Strona glowna
app.get('/', (req, res) => res.render('home'))

// Przesyłanie formulaza
// app.get('/formulaz', (req, res) => res.render('formulaz'))

// do sprawdaznia formulaza czy response jest prawidłowy
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

// funkcja do obsługi formulaza
app.get('/formulaz', (req, res) => {
res.render('formulaz', {csrf: 'miejsce na token csrf'})
})
// wysylanie POST bo to moment proces
app.post('/formulaz/process', (req, res) => {
  // console.log('wpisany color):' + req.query.form)
  console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf)
  // przekierowanie na wybrana strone
  res.redirect(303, '/thanks')
})

app.get('/thanks', (req, res) => res.render('thanks'))


// formulaz za pomoca fetch
app.get('/formFetch', (req, res) => res.render('formFetch'))
app.post('/api/formFetch', (req, res) => {
  
  res.send({ result: 'success' })
})




// Przesyłanie plikow
app.get('/foto', (req, res) => res.render('foto'))


const multiparty = require('multiparty')
app.post('/foto', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {

 res.send('send cos')

})
})


// Kontakt
app.get('/kontakt', (req, res) => {
  res.type('text/html')
  res.render('kontakt')
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
