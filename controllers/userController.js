import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const getToken = async ({_id})=>{
    const token = await jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '14d'})

    return token

}

export const signUp = async (req, res) => {

    const {name, email, password} = req.body

    try{
        const user = await User.signUp(name, email, password)

        res.status(201).json({user: user, token: await getToken(user)})
    /* user:{
    _id: 123456,
    name: john,
    email: john@deo.com,
    password: 123456
    }
    token: uhiuher9t898ut98u9u4r7h3if9h8fi3j04f9j[kmfonowh0fj0r9fu089u]i90u3ym
    
    
    */

    }catch(error){
        res.status(400).json({error:error.message})
    }
}


export const logIn = async ( req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.signIn(email, password)

        res.status(200).json({user: user, token: await getToken(user)})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}