import { Request, Response } from 'express';
import * as service from '../services/student.service';
import * as bcrypt from 'bcrypt';
import { errorResponse, createResponse, okResponse } from '../utils/responses';
import { sign } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

export const register = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    first_name ?? errorResponse(res, { msg: "No firt name" });
    last_name ?? errorResponse(res, { msg: "No last name" });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await service.createStudent(first_name, last_name, email, hashedPassword);
        const token = sign({ email }, 'yourSecretKey', { expiresIn: '1h' });
        createResponse(res, { data: token })
    } catch (error) {
        errorResponse(res, { error });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await service.getPasswordByEmail(email);
        if (result.length !== 1) {
            return errorResponse(res, { msg: "user doesn't exists" });
        }

        const passwordMatch = await bcrypt.compare(password, result[0].password);
        if (!passwordMatch) {
            return errorResponse(res, { msg: "password erroned" });
        }

        const token = sign({ email }, 'yourSecretKey', { expiresIn: '1h' });
        okResponse(res, { data: token })
    } catch (error) {
        errorResponse(res, { error });
    }
}