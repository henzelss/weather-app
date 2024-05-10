
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

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=b2a550c65a00f134d9a817cfcbd1f1b4&unit=metric"

    https.get(url, (response)=>{
        console.log(response);

        response.on("data", (data)=>{
            //console.log(data);
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            
            res.write(`<h1> The weather in Manila is ${description}
            `)
            res.write(`<h1> The temperature in Manila is ${temp}
            `)
            res.send();
            //res.send(`The temparature is ${temp}`)
        })

    })
})

