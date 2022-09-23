const mongoose = require('mongoose');

//Create energyFactorSchema schema for storing energy data
const energyFactorSchema = new mongoose.Schema({
    device_id: {
        type: Number
    },
    device_no: {
        type: Number
    },

    status: {
        Vrn: {
            type: Number
        },
        Vyn: {
            type: Number
        },
        Vbn: {
            type: Number
        },
        Vry: {
            type: Number
        },
        Vyb: {
            type: Number
        },
        Vbr: {
            type: Number
        },
        Ir: {
            type: Number
        },
        Iy: {
            type: Number
        },
        Ib: {
            type: Number
        },
        Active_Energy: {
            type: Number
        },
        Active_Power_Total: {
            type: Number
        },
        Frequency: {
            type: Number
        },

        datetime: {
            type: String
        },
    },


})
//Here crete Energy factor collection for storing energy data documents.
const EnergyFactor = new mongoose.model("EnergyFactors", energyFactorSchema);

module.exports = EnergyFactor;