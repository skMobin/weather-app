console.log("Client side javascript loaded.")



const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.messageOne')
const messageTwo = document.querySelector('.messageTwo')
const label = document.querySelector('h3')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    label.textContent = "Weather Update"
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    const location = search.value
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = "Loading..."
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
})