import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { getUserByEmail } from '../services/user.service';
import { errorResponse } from '../utils/responses';

export const registerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const user = await getUserByEmail(email);

    if (user !== null) {
        return errorResponse(res, { msg: "User already exists" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    next();
}