import Student from "../models/studentSchema.js"
import mongoose from "mongoose"


export const getStudents = async (req, res) => {

    try {
        const students = await Student.find()

        res.status(200).json({ students })
    } catch (error) {
        res.status(404).json({ "Error": error })
    }
}

/*
export async function getStudents(req, res){

}
*/ 

export const createStudent = async (req, res) => {
    const {name, age, matric_number, department} = req.body
    try{
            if(!name || !age || !matric_number || !department){
                return res.status(400).json({error: "All fields are required"})
            }
            const student = await Student.create(req.body)

            res.status(201).json({student})
    }catch(error){
        res.status(400).json({error: error})
    }

}

export const getSingleStudent = async (req, res) => {
    const {_id} = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({error: "Invalid student id"})  
        }

        const student = await Student.findById(_id)
        if(!student){
            return res.status(404).json({error: "Student not found"})
        }


        res.status(200).json({student})
    
    }catch(error){
        res.status(400).json({error: error})
    }
}


export const editStudent = async (req, res) => {
        const {_id} = req.params
        try{
            if(!mongoose.Types.ObjectId.isValid(_id)){
                return res.status(400).json({error: "Invalid student id"})  
            }
            const student = await Student.findByIdAndUpdate(_id, req.body, {new: true})
            if(!student){
                return res.status(404).json({error: "Student not found"})
            }
            res.status(200).json({student})
        }catch(error){
            res.status(400).json({error: error})
        }
}

export const deleteStudent = async (req, res) => {
    const {_id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({error: "Invalid student id"})  
        }
        const student = await Student.findByIdAndDelete(_id)
        if(!student){
            return res.status(404).json({error: "Student not found"})
        }
        res.status(200).json({message: "Student deleted successfully"})
    }catch(error){
        res.status(400).json({error: error})
    }
}