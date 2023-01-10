require("dotenv").config()
const { request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const PORT = process.env.PORT || 3300
const app = express()
// Pliki statyczne
app.use(express.static(__dirname + '/public'))

// silnik szablonow handlebars
// app.engine('handlebars', require(xpressHandlebars).__express)
// app.engine('handlebars', expressHandlebars.__express)
// app.set(‘views’, path.join(__dirname, ‘templates’))
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// przykladowy tekst
// app.get('*', (req, res) => {
// res.type('text/plain')
// res.send("hello word")})
// app.get((req, res) => {
// res.render('*', {
//   message: 'Witaj, szanowny programisto!',
//   style: req.query.style,
//   userid: req.cookies.userid,
//   username: req.session.username
// })
// })

// Strona glowna
app.get('/', (req, res) =>
res.render('home' ) )

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
  app.listen(PORT, () => console.log(
    `server start 3300`
    ))