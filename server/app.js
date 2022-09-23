const dotenv = require('dotenv')
const express = require('express');
const app = express();
const path = require('path');


dotenv.config({ path: './config.env' })

require('./db/conn')
const User = require('./model/userSchema')
const MeterList = require('./model/meterListSchema')
const EnergyFactor = require('./model/energyFactorSchema')
const Log = require('./model/logSchema')
const ZonesAndGateway = require('./model/zonesAndGateway')
// const Mqtt = require('./MQTT/Mqtt')

app.use(express.json())

//we create a new file for routing
app.use(require('./router/auth'));
// app.use('/images',express.static('images'))
app.use(express.static(path.join(__dirname, 'images')));

//build folder path
app.use(express.static(path.join(__dirname, 'build')));

// index file path
app.get('/*', (req, res) => {
    return res.status(200).sendFile(__dirname + '/build/index.html')
})

const PORT = process.env.PORT;

// //index file path
app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/build/index.html')
})

app.listen(PORT, () => {
    console.log(`server is running in port ${PORT} `)
})
