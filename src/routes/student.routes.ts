import express from 'express';
import  * as sc  from '../controllers/student.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const studentRouter = express.Router();

studentRouter.get('', authenticateToken, sc.getAllStudents);
studentRouter.get('/:id', authenticateToken, sc.getStudent);
studentRouter.delete('/:id', authenticateToken, sc.deleteStudent);
//studentRouter.post('/addtoteam/:StudentId/:factionId', sc.addStudentToTeam);

export default studentRouter;