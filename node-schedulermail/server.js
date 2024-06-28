const express = require('express');

const bodyParser = require('body-parser');
const agenda = require('./agenda/agenda');
const jwt = require('jsonwebtoken');
const authorize = require('./middleware/authorization');
const User = require('./models/user');
const {connectDB} = require('./config/db');
const cors = require('cors');
const {body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

const SecretKey = '77680dbd03cc456a831f929deebb8c48a732fc7f5481241331cfe31cda012150'
connectDB();

app.post('/signup',[body('email').isEmail().normalizeEmail(), body('password').isLength({min:6})],
async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password } = req.body;
    if(!email || !password){
        return res.status(500).send("Error is here in making new user");
    }
    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({
            email,
            password
        });
        await user.save();
        const token = generateToken(user);
        console.log('token genrated now onto the next step');
        return res.status(200).json({token});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const token = generateToken(user);
        console.log('token genrated now onto the next step');
        return res.status(200).json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
app.post('/schedule-mail', authorize,async (req,res)=>{
    console.log('schedule started');
    const { to, subject, text, scheduleTime } = req.body;

    if(!to || !subject || !text || !scheduleTime) {
        return res.status(400).send('Missing rrequired fields');
    }
    try {
        await agenda.schedule(scheduleTime, 'send email', {to, subject, text});
        res.status(200).send('Email scheduled successfully');
    }
    catch(error){
        res.status(500).send('Error scheduling email');
    }
});

function generateToken(user){
    return jwt.sign({id: user._id},SecretKey,{expiresIn: '30d'});
}
app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
})