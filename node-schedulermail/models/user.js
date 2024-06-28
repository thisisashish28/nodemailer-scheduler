const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//hashing the password first saving it

UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

//function to compare for logging in
UserSchema.methods.comparePassword = async function(candidatePassowrd) {
    return await bcrypt.compare(candidatePassowrd, this.password);

};
module.exports = mongoose.model('User', UserSchema);