const mongoose = require('mongoose');

//Create zones and gateway schema for collection document
const zonesAndGatewaySchema = new mongoose.Schema({
    zone_id:{
        type: String,
    },
    zone_name: {
        type: String,
    },
    gateways : [{
        gateway_id:{
            type: String,
        },
        gateway_name: {
            type: String,
        }
    }]
    
})

//Here crete ZonesAndGateway collection for storing zones and it's gateways.
const ZonesAndGateway = new mongoose.model("ZonesAndGateways", zonesAndGatewaySchema);

module.exports = ZonesAndGateway;