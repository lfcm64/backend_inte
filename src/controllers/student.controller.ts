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
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) { errorResponse(res, {msg: "Bad ID format"}) };

  try {
    const data = await service.getStudent(idNumber);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { errorResponse(res, {msg: "Bad ID format"}) };

  try {
    await service.deleteStudent(idNumber);
    okResponse(res, {msg: "Student deleted"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const addStudentToTeam = async (req: Request, res: Response) => {
  const { StudentId, teamId } = req.params;
  const StudentIdNumber = parseInt(StudentId, 10);
  const teamIdNumber = parseInt(teamId, 10);

  if (isNaN(StudentIdNumber)) { errorResponse(res, {msg: "Bad ID format"}) };
  if (isNaN(teamIdNumber)) { errorResponse(res, {msg: "Bad ID format"}) };

  try {
    await service.addStudentToTeam(StudentIdNumber, teamIdNumber);
    okResponse(res, {msg: "Student modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};
