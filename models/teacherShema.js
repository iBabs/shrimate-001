import mongoose from "mongoose";

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    staff_number: {
        type: String,
        required:   true ,
        unique: true
    }
})


const Teacher = mongoose.model("Teacher", teacherSchema)

export default Teacher