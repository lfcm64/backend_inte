import { Request, Response } from 'express';
import { db } from '../database/db';
import { Student, studentSchema } from '../schemas/user.schema';
import { Code, HttpResponse } from '../utils/response';
