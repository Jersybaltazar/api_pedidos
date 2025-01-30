import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateAlt = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("Request Body:", req.body);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }
    
    next();
  };