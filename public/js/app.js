console.log('Js loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Java script'

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
               return messageOne.textContent = data.error;
             }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                }
        
        })
    })

})