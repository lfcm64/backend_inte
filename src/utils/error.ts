import { Request, Response } from 'express';
import { Code, HttpResponse } from './response';

export const serviceError = (res: Response, error: any) => {
    console.error('Error:', error);
    res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, "bad request"));
};

export const fetchingError = (res: Response, msg: string) => {
    res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, msg));
};