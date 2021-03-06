console.log('Client Side JS loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg_1')
const msgTwo = document.querySelector('#msg_2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = 'Searching...'
    msgTwo.textContent = '' 

    const location = search.value
    fetch('/weather?address=' + location).then((res) => {

        res.json().then((data) => {
            msgOne.textContent = 'Fetching Data..'
            msgTwo.textContent = ''
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                //console.log(data.location , data.forecast)
            }
        })
    })
    //alert('testing.!')
})