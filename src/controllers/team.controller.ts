import { Request, Response } from 'express';
import { db } from '../database/db';
import { Team, teamSchema } from '../schemas/team.schema';
import { Code, HttpResponse } from '../utils/response';
