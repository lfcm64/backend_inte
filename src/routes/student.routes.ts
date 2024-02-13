import express from 'express';
import  * as sc  from '../controllers/student.controller';
import { authenticateToken } from '../middlewares/authStatus';

const studentRouter = express.Router();

studentRouter.get('/all', authenticateToken, sc.getAllStudents);
studentRouter.get('', authenticateToken, sc.getStudent);
studentRouter.delete('', authenticateToken, sc.deleteStudent);
studentRouter.post('/addtoteam', sc.addStudentToTeam);

export default studentRouter;