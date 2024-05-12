import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationErrorResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorList = errors.array().map((err) => err.msg);
    return res.status(400).json({
      ok: false,
      errors: errorList,
    });
  } else {
    next();
  }
};
