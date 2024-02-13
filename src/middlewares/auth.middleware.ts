import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { getStudentByEmail } from '../services/student.service';
import { verify } from 'jsonwebtoken';

export const registerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const result = await getStudentByEmail(email);

    if (result.length !== 0) {
        return res.status(400).json({ message: 'student already exists' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    next();
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    verify(token, 'yourSecretKey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        // Attach user information to the request for further use in routes
        (req as any).user = decoded;

        next();
    });
};

