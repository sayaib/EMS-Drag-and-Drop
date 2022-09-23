const mongoose = require('mongoose');

//Create log schema for collection document
const meterListSchema = new mongoose.Schema({
    meterId: {
        type: String
    },
    meterList: {
        type: [String]
    }
})

//Here crete Log collection for storing logs of user documents.
const MeterList = new mongoose.model("MeterLists", meterListSchema);

// const createDocuments = async () => {
//     try {
//         const docs = new MeterList({ meterId: "Meter", meterList: ["ttyCOM1_1", "ttyCOM1_2", "ttyCOM1_3", "ttyCOM1_4"] });

//         const result = await docs.save();
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }

// }
// createDocuments();

module.exports = MeterList;