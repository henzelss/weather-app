
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const { resolveAny } = require('dns')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res)=>{

    const city = "New York"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=b2a550c65a00f134d9a817cfcbd1f1b4&unit=metric"

    https.get(url, (response)=>{
        console.log(response);

        response.on("data", (data)=>{
            //console.log(data);
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write(`<h1> The weather in ${city} is ${description}
            `)
            res.write(`<h1> The temperature in ${city} is ${temp}
            `)
            res.write(`<img src=${iconURL}>
            `)
            res.send();
        })

    })
})

