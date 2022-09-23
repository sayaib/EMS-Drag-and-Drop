const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const multer = require('multer');
let path = require('path');
router.use(cookieParser())
require('../db/conn')
const User = require('../model/userSchema')
const Log = require('../model/logSchema');
const EnergyFactor = require('../model/energyFactorSchema')
const ZonesAndGateway = require('../model/zonesAndGateway')
const sendMail = require('../sendMail/sendMail');
const validator = require('validator');
const MeterList = require('../model/meterListSchema');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/updateClientProfile', upload.single('photo'), async (req, res) => {
    try {
        // console.log(req.photo)

        const user_name = req.body.user_name;
        const user_id = req.body.user_id

        // (req.files) ? req.files.filename : null;
        // const newUserData = { 
        //     name,
        //     photo
        // }
        if (req.file === undefined) {
            await User.updateOne({ user_id: user_id }, { $set: { user_name: user_name } })
        }
        else {
            const photo = req.file.filename
            await User.updateOne({ user_id: user_id }, { $set: { user_name: user_name, photo: photo } })
        }
        // if(!user_name){
        //     await User.updateOne({ user_id: user_id }, { $set: {  photo: photo } })
        // }else if(!photo){
        //     await User.updateOne({ user_id: user_id }, { $set: { user_name: user_name } })
        // }else{


        // }


        // const user = new User({ user_name, photo });
        // await user.save()


        res.status(200).send("User name updated")
    }
    catch (err) {
        console.log(err)
        res.status(400).send("error")
    }
});

//Registration
router.post('/register', async (req, res) => {
    const { user_name, user_type, email, password, cpassword } = req.body;

    try {
        const userExist = await User.findOne({ email: email, user_name: user_name });

        if (userExist) {
            return res.status(422).json({ error: "user already exist" })
        }
        const user = new User({ user_name, user_type, email, password, cpassword });
        console.log(password)
        await user.save();
        res.status(201).json({ message: " user relisted successfully" })

    } catch (error) {
        console.log(error);
    }

})

// //SignIn user and generate token for authentication
router.post('/signIn', async (req, res) => {
    try {
        let jwtToken
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ error: 'plz fill all the details' })
        }
        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);
        if (userLogin) {
            //generate JWT token for authenticatigation

            //compare password 
            const passwordMatch = await bcrypt.compare(password, userLogin.password);
            if (!passwordMatch) {
                res.status(400).json({ error: "Invalid password " })

            } else {

                jwtToken = await userLogin.generateAuthToken();
                // console.log(jwtToken);

                res.cookie("Token", jwtToken, {
                    expires: new Date(Date.now() + 43200000),
                    httpOnly: true
                });


                res.json({ message: "user login successfully" })
            }
        } else {
            res.status(400).json({ error: "Invalid user " })
        }
    } catch (error) {
        console.log("Credential not valid or received!!!");
    }
})


/////////////////////////////////////////////////////////////
// router.post("/signIn", async (req, res) => {

//     //Form Valdiation
//     const { errors, isValid } = validateLoginInput(req.body);

//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const email = req.body.email;
//     const password = req.body.password;

//     //Find user by Email
//     const User.findOne({ email }).then(user => {
//         if (!user) {
//             return res.status(404).json({ emailnotfound: "Email not found" });
//         }

//         // Check password 
//         bcrypt.compare(password, user.password).then(isMatch => {
//             if (isMatch) {
//                 // Create JWT Payload
//                 const payload = {
//                     id: user.id,
//                     name: user.name
//                 };

//                 // Sign token
//                 jwt.sign(
//                     payload,
//                     keys.secretOrKey,
//                     {
//                         expiresIn: 31556926
//                     },
//                     (err, token) => {
//                         res.json({
//                             success: true,
//                             token: "Bearer " + token
//                         });
//                     }
//                 );
//             } else {
//                 return res
//                     .status(400)
//                     .json({ passwordincorrect: "Password incorrect" });
//             }
//         });
//     });
// });

//reset password page ( enter email for validation )
router.post('/resetPass', (req, res) => {
    try {
        crypto.randomBytes(32, async (error, buffer) => {
            if (error) {
                console.log(error);
            }
            const token = buffer.toString("hex");
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(422).send("User don't exists with that email");
            } else {
                try {
                    user.token = token
                    user.expireToken = Date.now() + 300000
                    user.save().then((result) => {
                        sendMail(user.email, token);
                    })
                    res.status(201).json("Email send successful!!!");
                } catch (error) {
                    res.status(554).json("Email not send");

                }
            }
        })
    } catch (error) {
        console.log("Reset password token is not valid or received!!!");

    }
})


//new password generation
router.post('/newPassword', async (req, res) => {
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const reciveToken = req.body.token;
    try {
        //finding token in database for user confirmation 
        User.findOne({ expireToken: reciveToken, expireToken: { $gt: Date.now() } })
            .then(user => {
                if (!user) {
                    return res.status(422).send("Try again link expired !!!");
                }
                else {
                    if (newPassword === confirmPassword) {
                        user.password = newPassword;
                        user.token = undefined;
                        user.expireToken = undefined;
                        user.save().then((saveUser) => {
                            res.send("Successfully");
                        })

                    } else {
                        return res.status(422).send("Your password should not match !!!");
                    }
                }
            })
    } catch (error) {
        console.log("Data not received !!!");
    }
})

//update the password
router.post('/updatePassword', authenticate, async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(422).json({ error: 'plz fill all the details' })
        }
        const userData = req.rootUser;
        //finding perticular user who change his/her password
        const userLogin = await User.findOne({ user_id: userData.user_id });
        //console.log(userLogin);

        if (userLogin) {
            const passwordMatch = await bcrypt.compare(oldPassword, userLogin.password);
            if (!passwordMatch) {
                res.status(400).json({ error: "Invalid password " })
            } else {
                if (newPassword === confirmPassword) {
                    userLogin.password = newPassword;
                    //After new password generation, clear the cookies
                    res.clearCookie('Token', { path: '/' });
                    userLogin.save().then((saveUser) => {
                        res.status(201).json("New password set successful!!!");
                    })
                } else {
                    return res.status(422).send("Your password should not match !!!");
                }
                res.json({ message: "user password update successfully" })
            }
        } else {
            res.status(400).json({ error: "Invalid user " })
        }
    } catch (error) {
        console.log("New password data not recieved or bad request !!!");
    }
})

router.post('/register', async (req, res) => {
    const { user_name, email, password } = req.body;
    console.log(user_name, email, password);

    try {
        const userExist = await User.findOne({ email: email, user_name: user_name });

        if (userExist) {
            return res.status(422).json({ error: "user already exist" })
        }
        const user = new User({ user_name, email, password });
        console.log(password)
        await user.save();
        res.status(201).json({ message: " user relisted successfully" })

    } catch (error) {
        console.log(error);
    }

})


//MainPage : checking authentication to show confidential data to authorized person only
router.get('/mainpage', authenticate, async (req, res) => {
    // console.log('main page ....');
})

//get the data from valid user and send to the HeaderIcon for showing user_name on profile pop-up
router.get('/HeaderIcon', authenticate, async (req, res) => {
    try {
        res.send(req.rootUser);
        // console.log(req.rootUser);
    } catch (error) {
        console.log("User data not send or get!!!");
    }
})

//Get the data from database and show on User management table
router.get('/displayUser', authenticate, async (req, res) => {
    try {
        const findCompanyId = req.rootUser.company_id;
        const usersInfo = await User.find({ company_id: findCompanyId });
        //req.usersInfo=usersInfo;
        res.json(usersInfo);
    } catch (error) {
        console.log("User data not send or get!!!");
    }
})

//delete the user in User management table
router.post('/deleteUser', async (req, res) => {
    try {
        const userIdObject = req.body;
        const userID = Object.values(userIdObject);

        console.log(userID, userIdObject)

        if (!userID) {
            return res.status(422).send("user id is not valid!!!");
        }
        const deleteUserData = await User.deleteOne({ user_id: userID[0] });

        if (deleteUserData) {
            return res.status(201).json("user deleted!!!");
        }
        else {
            return res.status(400).json("user not deleted!!!");
        }
    } catch (error) {
        console.log("Data not valid or received !!!");
    }
})

//update the user in User management table
router.post('/updateUser', async (req, res) => {
    try {
        const userIdObject = req.body;
        const userID = Object.values(userIdObject);

        const { user_name, email, user_type } = req.body
        //console.log(user_type);

        if (!userID || !user_name || !email) {
            return res.status(422).send("user id is not valid!!!");
        }
        // const userExist = await User.findOne({ user_name: user_name })
        // if (userExist) {
        //     return res.status(409).json("user name is exists!!!");
        // }
        const updateUserData = await User.updateOne({ user_id: userID[0] }, { $set: { user_name: user_name, email: email, user_type: user_type } });
        res.status(201).json({ message: 'user updated successfully' })


    } catch (error) {
        res.status(409).json("user already exists!!!");
    }
})

//API for create and save user 
router.post('/newUser', async (req, res) => {
    const { user_name, email, user_type } = req.body
    let { company_id } = req.body;
    let total = await User.find({ company_id, user_id: { $exists: true } }).sort({ _id: -1 }).limit(1);
    let findUserIdString = (total[0].user_id).substring(0, 5);
    let splitUserId = (total[0].user_id).substring(5,);
    let user_id = findUserIdString + (Number(splitUserId) + 1);


    //validate Email address
    if (!validator.isEmail(email)) {
        return res.status(408).json({ error: 'email is not valid ...' })
    }
    if (!user_name || !email) {
        return res.status(422).json({ error: 'plz fill all the details' })
    }
    try {
        const userExist = await User.findOne({ $or: [{ email: email }, { user_name: user_name }] })
        if (userExist) {
            return res.status(409).json({ error: 'email already exists' })
        }
        if (user_type === undefined) {
            const user = new User({ user_id, user_name, email, user_type: 1, company_id, password: "Test@111" })
            await user.save()
        } else {
            const user = new User({ user_id, user_name, email, user_type, company_id, password: "Test@111" })
            await user.save()
        }
        res.status(201).json({ message: 'user registered successfully' })
    } catch (error) {
        console.log("Data not valid or received !!!");
    }
})

//store logs received from the User management in database
router.post('/logData', async (req, res) => {
    try {
        const { dateTime, message } = req.body
        if (!dateTime || !message) {
            return res.status(422).json({ error: 'Date and Message not received' })
        }
        const log = new Log({ dateTime, message })
        await log.save()
    } catch (error) {
        console.log("Data not valid or recived !!!");
    }
})

//Get the log data from database and show on Log management table
router.get('/getLogInfo', authenticate, async (req, res) => {
    try {
        const logsInfo = await Log.find({}).sort({ _id: -1 });
        res.json(logsInfo);

    } catch (error) {
        console.log("Log data not send or get!!!");
    }
})

//To check whether the user is admin or operator user
router.get('/userOrAdmin', authenticate, async (req, res) => {
    try {
        //console.log(req.rootUser);
        res.send(req.rootUser);
    } catch (error) {
        console.log("User data not send or get!!!");
    }
})

// logout functionality (clear the cookie from the browser)
router.get('/logout', (req, res) => {
    try {
        // console.log('Logout page ....');
        res.clearCookie('Token', { path: '/' });
        res.status(200).send('user Logout');
    } catch (error) {
        console.log("Cookies or Credensial not clear !!!");
    }
})

//get the map data and display on map module\
router.get('/displayChartData', authenticate, async (req, res) => {
    try {
        const EnergyFactorInfo = await EnergyFactor.find({});
        res.json(EnergyFactorInfo);
    } catch (error) {
        console.log("Data nor received or get !!!");
    }
})

//************************************************************************* */

//                          Company Management

//************************************************************************* */

//API for create and save user 
router.post('/newCompany', async (req, res) => {
    const { company_name, email, status, user_type, user_name } = req.body
    let { company_id } = req.body;
    // console.log( company_id, company_name, email, status);
    let total = await User.find({ company_id: { $exists: true } }).sort({ _id: -1 }).limit(1);
    if (total.length === 0) {
        company_id = company_id + 1;
    } else {
        var splitCompanyId = (total[0].company_id).substring(3,);
        company_id = company_id + (Number(splitCompanyId) + 1);
    }
    const user_id = company_id + "U1"

    //validate Email address
    if (!validator.isEmail(email)) {
        return res.status(408).json({ error: 'email is not valid ...' })
    }
    if (!company_name || !email) {
        return res.status(422).json({ error: 'plz fill all the details' })
    }
    try {
        const companyExist = await User.findOne({ $or: [{ email: email }, { company_name: company_name }] })
        if (companyExist) {
            return res.status(409).json({ error: 'email already exists' })
        }
        if (status === undefined) {
            const user = new User({ company_id, user_id, user_name, company_name, email, password: process.env.COMPANY_PASS, status: 0, user_type })
            await user.save()
        } else {
            const user = new User({ company_id, user_id, user_name, company_name, email, password: process.env.COMPANY_PASS, status, user_type })
            await user.save()
        }
        res.status(201).json({ message: 'Company registered successfully' })
    } catch (error) {
        console.log("Data not valid or received !!!");
        // console.log(error)
    }
})

//display all company on compay dashboard
router.get('/displayCompany', authenticate, async (req, res) => {
    try {
        const companyInfo = await User.find({ company_id: { $exists: true } }).sort({ _id: -1 });
        //req.usersInfo=usersInfo;
        res.json(companyInfo);
    } catch (error) {
        console.log("Company data not send or get!!!");
    }
})

//update the company in Comapny management table
router.post('/updateCompany', async (req, res) => {
    try {
        const companyIdObject = req.body;
        const companyID = Object.values(companyIdObject);

        const { company_name, user_name, email, status } = req.body
        //console.log(user_type);

        if (!companyID || !company_name || !email || !user_name) {
            return res.status(422).send("comapny id is not valid!!!");
        }
        // const userExist = await User.findOne({ user_name: user_name })
        // if (userExist) {
        //     return res.status(409).json("user name is exists!!!");
        // }
        const updateCompanyData = await User.updateOne({ company_id: companyID[0] }, { $set: { company_name, user_name, email, status } });
        res.status(201).json({ message: 'company updated successfully' })


    } catch (error) {
        res.status(409).json("company already exists!!!");
    }
})

//delete the company in company management table
router.post('/deleteCompany', async (req, res) => {
    try {
        const companyIdObject = req.body;
        const companyID = Object.values(companyIdObject);

        if (!companyIdObject) {
            return res.status(422).send("Company id is not valid!!!");
        }
        const deleteComapnyData = await User.deleteOne({ company_id: companyID[0] });

        if (deleteComapnyData) {
            return res.status(201).json("Company deleted!!!");
        }
        else {
            return res.status(400).json("company not deleted!!!");
        }
    } catch (error) {
        console.log("Data not valid or received !!!");
    }
})

let selectedParameterChart1
let selectedParameterChart2
let selectedParameterChart3
let selectedParameterChart4
let selectedMeterName

//for selecting parameter of chart-1
router.post('/postSelectedParameterChart1', async (req, res) => {

    try {
        const { parameterNameChart1 } = req.body
        // console.log(parameter)
        selectedParameterChart1 = parameterNameChart1
        // console.log(selectedParameterChart1)
        if (selectedParameterChart1) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//for selecting parameter of chart-2
router.post('/postSelectedParameterChart2', async (req, res) => {

    try {
        const { parameterNameChart2 } = req.body
        // console.log(parameterNameChart2)
        selectedParameterChart2 = parameterNameChart2
        if (selectedParameterChart2) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//for selecting parameter of chart-3
router.post('/postSelectedParameterChart3', async (req, res) => {

    try {
        const { parameterNameChart3 } = req.body
        // console.log(parameter)
        selectedParameterChart3 = parameterNameChart3
        if (selectedParameterChart3) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//for selecting parameter of chart-4
router.post('/postSelectedParameterChart4', async (req, res) => {

    try {
        const { parameterNameChart4 } = req.body
        // console.log(parameter)
        selectedParameterChart4 = parameterNameChart4
        if (selectedParameterChart4) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//for selecting meter
router.post('/postSelectedMeter', async (req, res) => {

    try {
        const { meterName } = req.body

        selectedMeterName = meterName
        // console.log(selectedMeterName)
        if (selectedMeterName) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }

    // let x = `status.${parameter}`
    // console.log();
    // const selectedData = await EnergyFactor.find({ subDeviceId: "ttyCOM1_4" }, { status: { [parameter]: 1, datetime: 1 } });
    // console.log(selectedData)
    // res.send(selectedData)
    // res.json(selectedData)
})

//get the map data and display on map module of chart-1
router.get('/getSelectedParameterChart1', authenticate, async (req, res) => {
    try {
        let selectedDataOfChart1;
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        let defaultMeter = meterInfo[0].meterList[0]
        // console.log(selectedMeterName)
        // console.log(selectedParameterChart1)
        if (selectedMeterName) {
            selectedDataOfChart1 = await EnergyFactor.find({ subDeviceId: selectedMeterName }, { subDeviceId: 1, status: { [selectedParameterChart1]: 1, datetime: 1 } });
        } else {
            selectedDataOfChart1 = await EnergyFactor.find({ subDeviceId: defaultMeter }, { subDeviceId: 1, status: { [selectedParameterChart1]: 1, datetime: 1 } });
        }

        // console.log(OfChart1);
        res.json(selectedDataOfChart1);
    } catch (error) {
        console.log(error);
    }
})

//get the map data and display on map module of chart-2
router.get('/getSelectedParameterChart2', authenticate, async (req, res) => {
    try {
        // console.log(selectedParameterChart2)
        let selectedDataOfChart2;
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        let defaultMeter = meterInfo[0].meterList[0]
        if (selectedMeterName) {
            selectedDataOfChart2 = await EnergyFactor.find({ subDeviceId: selectedMeterName }, { subDeviceId: 1, status: { [selectedParameterChart2]: 1, datetime: 1 } });
        } else {
            selectedDataOfChart2 = await EnergyFactor.find({ subDeviceId: defaultMeter }, { subDeviceId: 1, status: { [selectedParameterChart2]: 1, datetime: 1 } });
        }
        // console.log(selectedDataOfChart2);
        res.json(selectedDataOfChart2);
    } catch (error) {
        console.log(error);
    }
})

//get the map data and display on map module of chart-3
router.get('/getSelectedParameterChart3', authenticate, async (req, res) => {
    try {
        let selectedDataOfChart3;
        // console.log(selectedParameterChart3)
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        let defaultMeter = meterInfo[0].meterList[0]
        if (selectedMeterName) {
            selectedDataOfChart3 = await EnergyFactor.find({ subDeviceId: selectedMeterName }, { subDeviceId: 1, status: { [selectedParameterChart3]: 1, datetime: 1 } });
        } else {
            selectedDataOfChart3 = await EnergyFactor.find({ subDeviceId: defaultMeter }, { subDeviceId: 1, status: { [selectedParameterChart3]: 1, datetime: 1 } });

        }
        // console.log(OfChart1);
        res.json(selectedDataOfChart3);
    } catch (error) {
        console.log(error);
    }
})

//get the map data and display on map module of chart-4
router.get('/getSelectedParameterChart4', authenticate, async (req, res) => {
    try {
        let selectedDataOfChart4;
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        let defaultMeter = meterInfo[0].meterList[0]
        // console.log(selectedParameterChart4)
        if (selectedMeterName) {
            selectedDataOfChart4 = await EnergyFactor.find({ subDeviceId: selectedMeterName }, { subDeviceId: 1, status: { [selectedParameterChart4]: 1, datetime: 1 } });
        } else {
            selectedDataOfChart4 = await EnergyFactor.find({ subDeviceId: defaultMeter }, { subDeviceId: 1, status: { [selectedParameterChart4]: 1, datetime: 1 } });

        }
        // console.log(OfChart1);
        res.json(selectedDataOfChart4);
    } catch (error) {
        console.log(error);
    }
})

// get all meter list for selection
router.get('/getAllMeters', authenticate, async (req, res) => {
    try {
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        console.log("><><<><><>>", meterInfo)
        // req.usersInfo = usersInfo;
        res.json(meterInfo);
    } catch (error) {
        console.log("Meter data not send or get!!!");
    }
})

//get meter wise parameter as per user need
router.get('/getParameterMeterWise', authenticate, async (req, res) => {
    try {
        // console.log("get selected meter name :",selectedMeterName)
        if (selectedMeterName === undefined) {
            console.log("Meter not selected")
        }
        else {
            const meterInfo = await EnergyFactor.find({ subDeviceId: selectedMeterName });
            //req.usersInfo=usersInfo;
            let dateAndTimeOfPerticularMeter = await EnergyFactor.find({ subDeviceId: selectedMeterName }, { status: { datetime: 1 } });

            const selectedMeterparameter = meterInfo[meterInfo.length - 1];
            // console.log(selectedMeterparameter)
            Object.keys(selectedMeterparameter.status).forEach(key => {
                if (selectedMeterparameter.status[key] === undefined) {
                    delete selectedMeterparameter.status[key];
                }
                delete selectedMeterparameter.status["datetime"];
            });
            // console.log(Object.keys(selectedMeterparameter.status))

            let dateTime = []
            let firstParameterData = [];
            let secondParameterData = [];
            let thirdParameterData = [];
            let fourthParameterData = [];

            // length of MeterData = selectedData
            for (let i = 0; i < meterInfo.length; i++) {
                const sliced = Object.fromEntries(
                    Object.entries(meterInfo[i].status).slice(0, 4)
                );

                firstParameterData.push(Object.values(sliced)[0])
                secondParameterData.push(Object.values(sliced)[1])
                thirdParameterData.push(Object.values(sliced)[2])
                fourthParameterData.push(Object.values(sliced)[3])

                // console.log(sliced)
                // finalData.push(sliced)

                dateTime.push(dateAndTimeOfPerticularMeter[i].status.datetime)
            }
            let perticularMeterParameter = Object.keys(selectedMeterparameter.status)

            res.json({ perticularMeterParameter, firstParameterData, secondParameterData, thirdParameterData, fourthParameterData, dateTime });
        }

    } catch (error) {
        console.log("Meter data not send or get!!!");
        console.log(error)
    }
})

// get all meter list for selection
router.get('/getDefaultMeterData', authenticate, async (req, res) => {
    try {
        const meterInfo = await MeterList.find({ meterId: "Meter" });
        //req.usersInfo=usersInfo;
        // console.log(meterInfo[0].meterList[0], "617")
        // console.log("by default ",selectedMeterName)
        // console.log(meterInfo)
        let meterName = meterInfo[0].meterList[0]
        if (meterName === undefined) {
            console.log("Meter not selected")
        }
        else {
            const MeterData = await EnergyFactor.find({ subDeviceId: meterName });
            let selectedData = await EnergyFactor.find({ subDeviceId: meterName }, { status: { datetime: 1 } });

            // console.log(selectedData)
            //req.usersInfo=usersInfo;

            const selectedMeterparameter = MeterData[MeterData.length - 1]

            Object.keys(selectedMeterparameter.status).forEach(key => {
                if (selectedMeterparameter.status[key] === undefined) {
                    delete selectedMeterparameter.status[key];
                }
                delete selectedMeterparameter.status["datetime"];
            });

            let dateTime = []
            let firstParameterData = [];
            let secondParameterData = [];
            let thirdParameterData = [];
            let fourthParameterData = [];

            // length of MeterData = selectedData
            for (let i = 0; i < MeterData.length; i++) {
                const sliced = Object.fromEntries(
                    Object.entries(MeterData[i].status).slice(0, 4)
                );

                firstParameterData.push(Object.values(sliced)[0])
                secondParameterData.push(Object.values(sliced)[1])
                thirdParameterData.push(Object.values(sliced)[2])
                fourthParameterData.push(Object.values(sliced)[3])

                // console.log(sliced)
                // finalData.push(sliced)

                dateTime.push(selectedData[i].status.datetime)
            }

            // console.log(dateTime)
            // console.log(firstParameterData, secondParameterData, thirdParameterData, fourthParameterData)

            let finalParameter = Object.keys(selectedMeterparameter.status)
            // for (let i = 0; i < selectedMeterparameter.length; i++) {
            //     finalParameter.push(Object.keys(selectedMeterparameter)[i])

            // }

            // console.log(finalParameter)
            res.json({ finalParameter, firstParameterData, secondParameterData, thirdParameterData, fourthParameterData, dateTime });
        }
    } catch (error) {
        console.log(error);
    }
})

//post zone data
router.post('/newZone', async (req, res) => {
    const { zone_name } = req.body
    // console.log(zone_name)
    let zone_id = "Zone"
    let total = await ZonesAndGateway.find({ zone_id: { $exists: true } }).sort({ _id: -1 }).limit(1);
    if (total.length === 0) {
        zone_id = zone_id + 1;
    } else {
        var splitZoneId = (total[0].zone_id).substring(4,);
        // console.log(splitZoneId)
        zone_id = zone_id + (Number(splitZoneId) + 1);
    }
    // console.log(zone_id)
    if (!zone_name) {
        return res.status(422).json({ error: 'plz fill all the details' })
    }
    try {
        const zoneExist = await ZonesAndGateway.findOne({ zone_name: zone_name })
        if (zoneExist) {
            return res.status(409).json({ error: 'zone already exists' })
        }
        const resultZones = new ZonesAndGateway({ zone_id, zone_name })
        await resultZones.save();
        res.status(201).json({ message: 'Zone registered successfully' })
    } catch (error) {
        console.log("Data not valid or received !!!");
        console.log(error)
    }
})

//display all zones on dashboard
router.get('/displayZone', authenticate, async (req, res) => {
    try {
        const zoneInfo = await ZonesAndGateway.find().sort({ _id: -1 });
        //req.usersInfo=usersInfo;
        res.json(zoneInfo);
    } catch (error) {
        console.log("Zone data not send or get!!!");
    }
})

//update the zone in zone management table
router.post('/updateZone', async (req, res) => {
    try {

        const { zone_name, zone_id } = req.body

        if (!zone_id || !zone_name) {
            return res.status(422).send("zone id is not valid!!!");
        }
        const updateZoneData = await ZonesAndGateway.updateOne({ zone_id }, { $set: { zone_name } });
        if (updateZoneData) {
            res.status(201).json({ message: 'zone updated successfully' })
        }
        else {
            return res.status(400).json("zone not updated!!!");
        }

    } catch (error) {
        res.status(409).json("zone already exists!!!");
    }
})

//delete the zone in zone management table
router.post('/deleteZone', async (req, res) => {
    try {
        const { zone_id } = req.body;

        if (!zone_id) {
            return res.status(422).send("zone id is not valid!!!");
        }
        const deleteZoneData = await ZonesAndGateway.deleteOne({ zone_id });

        if (deleteZoneData) {
            return res.status(201).json("zone deleted!!!");
        }
        else {
            return res.status(400).json("zone not deleted!!!");
        }
    } catch (error) {
        console.log("Data not valid or received !!!");
    }
})

//all zone show on gateway management selection table
router.get('/getZonesName', authenticate, async (req, res) => {
    try {
        const zoneInfo = await ZonesAndGateway.find({});
        //req.usersInfo=usersInfo;
        // console.log(zoneInfo)
        res.json(zoneInfo);
    } catch (error) {
        console.log("Zone data not send or get!!!");
    }
})

//post gateway data
router.post('/postGatewayData', async (req, res) => {
    const { gateway_id, gateway_name, zone_id } = req.body
    // console.log("CHECK : ", gateway_id, gateway_name,zone_id)
    // console.log(typeof(zone_id))
    if (!gateway_id || !gateway_name || !zone_id) {
        return res.status(422).json({ error: 'plz fill all the details' })
    }
    try {
        const zoneExist = await ZonesAndGateway.findOne({ zone_id: zone_id })
        if (zoneExist) {
            const gatewayExist = await ZonesAndGateway.findOne({ $or: [{ gateways: { gateway_id } }, { gateways: { gateway_name } }] })
            if (gatewayExist) {
                return res.status(409).json({ error: 'Gateway id or name already exists' })
            } else {
                const addGatewayInZone = await ZonesAndGateway.updateOne({ zone_id: zone_id }, { $push: { gateways: { gateway_id, gateway_name } } })
                res.status(201).json({ message: 'Gateway registered successfully' })
            }
        } else {
            return res.status(400).json({ error: 'Not registered' })
        }
    } catch (error) {
        console.log("Data not valid or received !!!");
        console.log(error)
    }
})

let zoneId;
//zone id post for gateway 
router.post('/zoneIdForGateway', async (req, res) => {

    try {
        const { zone_id } = req.body
        // console.log(zone_id)
        zoneId = zone_id
        if (zoneId) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//display all gateway on dashboard
router.get('/displayGateway', authenticate, async (req, res) => {
    // console.log("gateway ===== ", zoneId);
    try {
        const zoneInfo = await ZonesAndGateway.find({ zone_id: zoneId, gateways: { $exists: true } }, { gateways: 1 }).sort({ _id: -1 });
        //req.usersInfo=usersInfo;
        zoneInfo.map((data) => {
            res.json(data.gateways);
        })
        // console.log(zoneInfo)

    } catch (error) {
        console.log("Zone data not send or get!!!");
        console.log(error)
    }
})

//update the gateway in zone management table
router.post('/updateGateway', async (req, res) => {
    try {

        const { gateway_name, gateway_id, zone_id } = req.body
        // console.log(gateway_name, gateway_id, zone_id)
        if (!gateway_id || !gateway_name) {
            return res.status(422).send("zone id is not valid!!!");
        }
        const updateGatewayData = await ZonesAndGateway.updateOne({ zone_id, "gateways.gateway_id": gateway_id }, { $set: { "gateways.$.gateway_name": gateway_name } });
        if (updateGatewayData) {
            res.status(201).json({ message: 'gateway updated successfully' })
        }
        else {
            return res.status(400).json("gateway not updated!!!");
        }

    } catch (error) {
        res.status(409).json("gateway already exists!!!");
        console.log(error)
    }

})

//delete the gateway in zone management table
router.post('/deleteGateway', async (req, res) => {
    try {
        const { zone_id, gateway_id } = req.body;

        if (!zone_id || !gateway_id) {
            return res.status(422).send("zone id is not valid!!!");
        }
        const deleteGatewayData = await ZonesAndGateway.updateOne({ zone_id }, { $pull: { gateways: { gateway_id } } });

        if (deleteGatewayData) {
            return res.status(201).json("Gateway deleted!!!");
        }
        else {
            return res.status(400).json("Gateway not deleted!!!");
        }
    } catch (error) {
        console.log("Data not valid or received !!!");
    }
})

let gatewayId;
//zone id post for gateway 
router.post('/gatewayIdForMeter', async (req, res) => {

    try {
        const { gateway_id } = req.body
        // console.log(gateway_id)
        gatewayId = gateway_id
        if (gatewayId) {
            return res.status(201).json("Data Posted");
        } else {
            return res.status(400).json("Data not post");
        }
    } catch (error) {
        console.log("Data not valid or received !!!")
    }
})

//display all gateway on dashboard
router.get('/displayMeter', authenticate, async (req, res) => {
    try {
        const meterInfo = await EnergyFactor.find({ gateway_id: gatewayId }, { gateway_id: 1, subDeviceId: 1 })
        // console.log(meterInfo)
        res.json(meterInfo);
    } catch (error) {
        console.log("Meter data not send or get!!!");
        // console.log(error)
    }
})

module.exports = router;
