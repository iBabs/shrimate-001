// bearer iuhdfvikjbdkjrhfibeuhoneifgebu guegou ienchoiuencmiow

import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const authentication = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) return res.status(401).json({error: 'You must be logged in'})

        try {
            const token = authorization.split(' ')[1]
            if(!token) return res.status(401).json({error: 'You must be logged in'})

                const {_id} = jwt.verify(token, process.env.JWT_SECRET)
                if(!_id) return res.status(401).json({error: 'Unauthorized User'})

                const user = await User.findById(_id)

                req.user = user
             next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({error: 'Unauthorized User'})
        }


}

export default authentication;