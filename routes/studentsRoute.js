import { Router } from "express";
import { createStudent, deleteStudent, editStudent, getSingleStudent, getStudents } from "../controllers/studentController.js";
import authentication from "../middleware/authentication.js";


const studentRouter = Router()

studentRouter.get('/', authentication, getStudents)
studentRouter.get('/:_id', authentication, getSingleStudent)
studentRouter.post('/', authentication, createStudent)
studentRouter.patch('/:_id', authentication, editStudent)
studentRouter.delete('/:_id', authentication, deleteStudent)



export default studentRouter