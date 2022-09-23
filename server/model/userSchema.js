const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Create user schema for storing the data of Users
const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        // unique: true
    },
    user_type: {
        type: Number,
        // required: true
    },
    user_name: {
        type: String,
        min: 3,
        max: 20,
        // unique: true,
    },
    email: {
        type: String,
        //required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        min: 8,
    },
    photo: {
        type: String
    },
    company_id: {
        type: String
    },
    company_name: {
        type: String
    },
    status: {
        type: Number
    },
    //this token for Email validation and expire token 
    token: {
        type: String
    },
    expireToken: {
        type: Date
    },
    //this is for generating jwt token
    jwtTokens: [
        {
            jwtToken: {
                type: String,
                // required: true
            }
        }
    ],

});


//Here hashing the password for encryption
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    //creating auto-increment user_id ex:(EMS1,EMS2 ...) 
    // if (this.isNew) {
    //     let total = await User.find().sort({ _id: -1 }).limit(1);
    //     var companyName = "EMS";
    //     if (total.length === 0) {
    //         this.user_id = companyName + 1;
    //     }
    //     else {
    //         var splitUserId = (total[0].user_id).substring(3,);
    //         this.user_id = companyName + (Number(splitUserId) + 1);
    //     }
    // }
    next();
})

//Generating authenticate token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let jwtToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.jwtTokens = this.jwtTokens.concat({ jwtToken: jwtToken });
        await this.save();
        return jwtToken;
    } catch (err) {
        console.log(err);
    }
}

//Here crete User collection for storing documents.
const User = new mongoose.model('Users', userSchema)

// Create or Add documents in user collection
// const createDocuments = async () => {
//     try {
//         const docs = new User({ user_id: "", user_type: 0, user_name: "OslUser", email: "osl@gmail.com", password: "Osl@1234" });

//         const result = await docs.save();
//         //console.log(result);
//     } catch (error) {
//         console.log(error);
//     }

// }
// createDocuments();



module.exports = User;