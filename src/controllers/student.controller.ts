import { Request, Response } from 'express';
import * as service from '../services/student.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllStudents();
    okResponse(res, {data});
  } catch(error) {
    errorResponse(res, {error});
  }
}

export const getStudent = async (req: Request, res: Response) => {
    const { id } = req.body;

  try {
    const data = await service.getStudent(id);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await service.deleteStudent(id);
    okResponse(res, {msg: "Student deleted"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const addStudentToTeam = async (req: Request, res: Response) => {
  const { StudentId, teamId } = req.body;

  try {
    await service.addStudentToTeam(StudentId, teamId);
    okResponse(res, {msg: "Student modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};
