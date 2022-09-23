const { json } = require('express')
var mqtt = require('mqtt')
// //const User = require('../modules/userSchema')
const EnergyFactors = require('../model/energyFactorSchema')
const MeterList = require('../model/meterListSchema')
const options = {
    keepalive: 60,
    username: "osl",
    password: "1234",
    // connectTimeout: 1000
}
//  const client = mqtt.connect('mqtt://192.168.1.227/1883',options)
// const client = mqtt.connect('mqtt://127.0.0.1/1883', options)

//AWS ip address
var client = mqtt.connect('mqtt://13.234.32.176', options)

// var dashboardTable = require('./data')
// console.log(dashboardTable)
// client.on('connect', function () {
//     client.subscribe('mqtt/dev', function (err) {
//         if (!err) {
//             client.publish('mqtt/dev', JSON.stringify(dashboardTable))
//         } else {
//             console.log(err)
//         }
//     })
// })
// controller.js
// const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://localhost')
client.on('connect', () => {
    try {
        client.subscribe('ioclData', { qos: 2 })
        console.log("connection successful MQTT")
    } catch (error) {
        console.log(error);
    }
})
client.on('message', (topic, message) => {
    try {
        if (topic === 'ioclData') {
            connected = (message.toString() === 'true');
            const obj = JSON.parse(message.toString());
            console.log("-------");
            console.log(obj);
            console.log("-------");
        };
    } catch (error) {
        console.log(error);
    }
})
// client.on('message', function(topic, message) {
//     console.log(topic, message)
//     console.log("message received from ", topic)
//     const subTopic = topic.split("/")[1]
//     console.log("for ", subTopic, message.toString())
//     })
//client.subscribe('some/test/ships');
client.handleMessage = function (packet, done) {
    console.log(packet);
    let Data = [
        {
            Id: "714834014",
            No: "1234AB5678",
            T0: "26:08:2022-13:00:14",
            Enr: "238.0,237.8,237.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,50.2",
            T1: "20:09:2022 16:30:15"
        }
    ]
    // let data = JSON.parse(packet.payload.toString());


    // console.log(data.payload[0]);

    // console.log(data.payload[0].device_id);
    // console.log(data.payload[0].status.Reactive_Power_Total);


    //done();
    // let morningTen = data.payload[0].status.timestamp;
    // let on = new Date(morningTen * 1000);
    // var options = { hour12: false };
    // var dateIST = new Date(on).toLocaleTimeString(undefined, options, { timeZone: 'Asia/Kolkata' })
    // var day = on.getDate()
    // var month = on.getMonth() + 1
    // var year = on.getFullYear()

    // const timeStr = dateIST
    // const convertTime = timeStr => {
    //     const [time, modifier] = timeStr.split(' ');
    //     let [hours, minutes] = time.split(':');
    //     if (hours === '12') {
    //         hours = '00';
    //     }
    //     if (modifier === 'PM') {
    //         hours = parseInt(hours, 10) + 12;
    //     }
    //     return `${hours}:${minutes}:${00}`;
    // };
    // console.log();




    // var utcSeconds = data.payload[0].status.timestamp;
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);
    // var dateUTC = new Date(d);
    // var dateUTC = dateUTC.getTime()
    // var dateIST1 = new Date(dateUTC);
    // //date shifting for IST timezone (+5 hours and 30 minutes)
    // dateIST1.setHours(dateIST1.getHours() + 5);
    // dateIST1.setMinutes(dateIST1.getMinutes() + 30);
    // console.log("=================", dateIST1);

    // var finalDate = new Date(dateIST1).toLocaleTimeString(undefined, options, { timeZone: 'Asia/Kolkata' })



    // const indianTime = `${year}-${month}-${day} ${finalDate}`
    // console.log("2uye938yer32yr82yr8273yr8724ry7843y84yr834r848u4yr")
    // console.log(indianTime)
    // console.log(`${year}-${month}-${day} ${finalDate}`)

    // console.log("000000000", indianTime);


    try {
        const device_id = parseInt(Data[0].Id);
        const device_no = parseInt(Data[0].No);
        const EnrArray = Data[0].Enr.split(",");
        const datetime = Data[0].T1;

        // (Vrn,Vyn,Vbn,Vry,Vyb,Vbr,Ir,Iy,Ib,Active Energy,Active Power Total,Frequency)
        // "Enr": "234.7,234.3,234.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,50.0",

        const [Vrn, Vyn, Vbn, Vry, Vyb, Vbr, Ir, Iy, Ib, Active_Energy, Active_Power_Total, Frequency] = [234.7, 234.3, 234.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 50.0];

        console.log(Vrn, Vyn, Vbn, Vry, Vyb, Vbr, Ir, Iy, Ib, Active_Energy, Active_Power_Total, Frequency)
        console.log(device_id)
        let meterList = [];
        // meterList.push(device_id);

        if (meterList === undefined) {
            meterList.push(device_id);
        } else {
            const findMeterInMeterList = meterList.find(e => e === device_id)
            if (findMeterInMeterList) {
                return;
            } else {
                meterList.push(device_id);
            }
        }

        console.log("Meterlist:", meterList);
        // const checkMeter = async () => {
        //     const result = await MeterList.updateOne({ meterId: "Meter" }, { $push: { meterList: device_id } });
        // }
        const checkMeter = async () => {
            const checkMeterIdInDb = await MeterList.findOne({ meterList: device_id });
            console.log("db", checkMeterIdInDb);
            if (!checkMeterIdInDb) {
                const checkMeter = await MeterList.findOne({ meterId: "Meter" });
                console.log("meter", checkMeter)
                if (checkMeter) {
                    const result = await MeterList.updateOne({ meterId: "Meter" }, { $push: { meterList: device_id } });
                } else {
                    const result = new MeterList({ meterId: "Meter", meterList: device_id });
                    const checkresult = await result.save();
                    console.log("Result", checkresult)
                }

            }

        }
        console.log(meterList)
        checkMeter();
        const EnergyFactorInfo = new EnergyFactors({ device_id, device_no, status: { Vrn, Vyn, Vbn, Vry, Vyb, Vbr, Ir, Iy, Ib, Active_Energy, Active_Power_Total, Frequency, datetime } });
        const result = EnergyFactorInfo.save();
        console.log("Data inserted !!!");

    } catch (error) {
        console.log("Data not inserted !!!");
        console.log(error);
    }

    done();
}


