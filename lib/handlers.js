const url = 'api/foto'
// const form = document.getElementById('form');
// const formData = new FormData();
// fromData.append(foto, file)


fetch(url, { method: 'post', body })
.then(resp => {
  if(resp.status < 200 || resp.status >= 300)
    throw new Error(`Żądanie zakończyło się niepowodzeniem ${resp.status}`)
  return resp.json()
})
.then(json => {
  container.innerHTML = `<b>Dziękujemy za przesłanie zdjęcia!</b>`
})
.catch(err => {
  container.innerHTML = `<b>Przykro nam, wystąpił problem podczas przetwarzania ` +
    `przesłanego pliku.  Spróbuj <a href="/newsletter">ponownie</a>`
})







// <script>
//   document.getElementById('vacationPhotoContestForm')
// .addEventListener('submit', evt => {
//       evt.preventDefault()
//       const body = new FormData(evt.target)
//       const container =
//         document.getElementById('vacationPhotoContestFormContainer')
//       const url = '/api/vacation-photo-contest/{{year}}/{{month}}'

//       fetch(url, { method: 'post', body })
//         .then(resp => {
//           if(resp.status < 200 || resp.status >= 300)
//             throw new Error(`Żądanie zakończyło się niepowodzeniem ${resp.status}`)
//           return resp.json()
//         })
//         .then(json => {
//           container.innerHTML = '<b>Dziękujemy za przesłanie zdjęcia!</b>'
//         })
//         .catch(err => {
//           container.innerHTML = `<b>Przykro nam, wystąpił problem podczas przetwarzania ` +
//             `przesłanego pliku.  Spróbuj <a href="/newsletter">ponownie</a>`
//         })
//     })
// </script>


