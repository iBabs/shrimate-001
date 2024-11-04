import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.statics.signUp = async function (name, email, password){
    if(!name || !email || !password){
        throw new Error('All fields are required');
    }
    if(!validator.isEmail(email)){
        throw new Error('Invalid email');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character');
    }
    const existingUser = await this.findOne({email});
    if(existingUser){
        throw new Error('User with this email already exists');
    }
 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);


    const user = await this.create({name, email:email.toLowerCase(), password:hashedPassword});

    return user;
}

userSchema.statics.signIn = async function (email, password){
    if(!email || !password){
        throw new Error('All fields are required');
    }
    
    const user = await this.findOne({email});
    if(!user){
        throw new Error('User not found');
    }
    const isMatch = bcrypt.compareSync(password, user.password);

    
    if(!isMatch){
        throw new Error('Invalid password');
    }

    return user;
}



const User = mongoose.model('User', userSchema);

export default User;