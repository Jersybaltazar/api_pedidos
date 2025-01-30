import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new Error('Autenticación requerida');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
      }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    req.user = { 
      id: user.id,
      email: user.email
    };
    next();
  } catch (error:any) {
    res.status(401).json({ message: error.message });
  }
};