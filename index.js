require("dotenv").config()
// const { request } = require('express')
const express = require('express')
const handlebars = require('express-handlebars')

const PORT = process.env.PORT || 3300
const app = express()
// Pliki statyczne
app.use(express.static(__dirname + '/public'))

// silnik szablonow handlebars
app.engine('handlebars', expressHandlebars({ extname: '.hbs' }))
app.set('view engine', '.hbs')

// przykladowy tekst
app.get('*', (req, res) => {
res.type('text/plain')
res.send("hello word")})
// app.get((req, res) => {
// res.render('*', {
//   message: 'Witaj, szanowny programisto!',
//   style: req.query.style,
//   userid: req.cookies.userid,
//   username: req.session.username
// })
// })

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
    res.send('500 - Błąd serwera')
  })
  // nasluchiwanie servera
  app.listen(PORT, () => console.log(
    `Express został uruchomiony pod adresem http://localhost:${PORT}; ` +
    `naciśnij Ctrl-C, aby zakończyć.`))