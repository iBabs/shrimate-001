import mongoose from "mongoose"
import Teacher from "../models/TeacherShema"

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.status(200).json({ teachers })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
}

export const getOneTeacher = async (req, res) => {
    const { _id } = req.params
    try {
        const teacher = await Teacher.findById(_id)

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({ error: "Invalid teacher id" })
        }


        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" })
        }
        res.status(200).json({ teacher })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const createTeacher = async (req, res) => {
    const {name, age, department, level, staff_number }= req.body

    try {
        if(!name || !age || !department || !level || !staff_number){
            return res.status(400).json({ error: "All fields are required" })
        }
        const teacher = await Teacher.create(req.body)
        res.status(201).json({ teacher })


    } catch (error) {
        res.status(400).json({ error: error })
    }
}