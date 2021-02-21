/* Global Variables */
const button = document.getElementById('generate')
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

// to be update dynamically 
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

// api configuration
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const key = 'aee48f0cdb1a3e917c57483b56fc6e86'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherData = async (baseURL, zip, apiKey) => {
    try {
      const request = await fetch(`${baseURL}?zip=${zip}&units=imperial&APPID=${apiKey}`)
      const result = await request.json()
      console.log(result.main)
      return result.main
    } catch (e) {
      throw e
    }
  }

async function saveData (path, data){
  try {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    throw e
  }
}

button.addEventListener('click', () => {
  getWeatherData(baseURL, zip.value, key)
    .then(data => {
        console.log(data)
      return {date: newDate, temp: data.temp, content: feelings.value}
    }).then(data => {
      saveData('/projectdata', data)
      return data
    })
    .then(data => {
      date.innerText = data.date
      temp.innerText = data.temp
      content.innerText = data.content
    })
    .catch(e => {
      console.error(e)
    })
})