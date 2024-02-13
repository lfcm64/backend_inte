import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


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

