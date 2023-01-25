

// Nieco zmodyfikowana wersja oficjalnego wzorca regularnego adresu e-mail ze specyfikacji W3C HTML5:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
// const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
//   '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
//   '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')


// app.post('/newsletter', function(req, res){
//     const name = req.body.name || '', email = req.body.email || ''
//     // Walidacja danych wejściowych 
//     if(VALID_EMAIL_REGEX.test(email)) {
//       req.session.flash = {
//         type: 'danger',
//         intro: 'Błąd walidacji!',
//         message: 'Wpisany adres e-mail jest błędny.',
//       }
//       return res.redirect(303, '/newsletter')
//     }


    // NewsletterSignup jest przykładowym obiektem, jaki można utworzyć; ponieważ
    // każda implementacja może być różna, to do nas należy definicja tych 
    // interfejsów specyficznych dla projektu. Ten przykład pokazuje jedynie, jak może 
    // wyglądać typowa implementacja Expressa w projekcie.
    // new NewsletterSignup({ name, email }).save((err) => {
    //     if(err) {
    //       req.session.flash = {
    //         type: 'danger',
    //         intro: 'Błąd bazy danych!',
    //         message: 'Wystąpił błąd bazy danych; spróbuj ponownie później.',
    //       }
    //       return res.redirect(303, '/newsletter/archive')
    //     }
    //     req.session.flash = {
    //       type: 'success',
    //       intro: 'Dziękujemy!',
    //       message: 'Zarejestrowałeś się na newsletter.',
    //     };
    //     return res.redirect(303, '/newsletter/archive')
    // })
// })





// const url = 'api/foto'

// const form = document.getElementById('form');
// const formData = new FormData();
// fromData.append(foto, file)



// ZAJASC SIE FETCH POZNIEJ TERAZ

// fetch(url, { method: 'post', body })
// .then(resp => {
//   if(resp.status < 200 || resp.status >= 300)
//     throw new Error(`Żądanie zakończyło się niepowodzeniem ${resp.status}`)
//   return resp.json()
// })
// .then(json => {
//   container.innerHTML = `<b>Dziękujemy za przesłanie zdjęcia!</b>`
// })
// .catch(err => {
//   container.innerHTML = `<b>Przykro nam, wystąpił problem podczas przetwarzania ` +
//     `przesłanego pliku.  Spróbuj <a href="/newsletter">ponownie</a>`
// })





