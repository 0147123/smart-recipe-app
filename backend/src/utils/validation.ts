import { Result, ValidationError } from "express-validator";
import { Response, Request, NextFunction } from "express";

// handle input validation errors from express-validator
export const inputValidationErrorsHandleing = (errors: Result<ValidationError>, res: Response) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
}

export const couponValidation = async (req: Request, res: Response, next: NextFunction) => {
  // check if the is_limited_quantity is false, if so, distributed_amount and total_amount must be null
  if (!req.body.is_limited_quantity && (req.body?.distributed_amount || req.body?.total_amount)) {
    return res.status(400).json({ message: "If the coupon is not limited quantity, distributed_amount and total_amount must be null." });
  }

  // check if the is_limited_quantity is true, if so, distributed_amount and total_amount must be a number
  if (req.body.is_limited_quantity && (typeof req.body?.distributed_amount !== "number" || typeof req.body?.total_amount !== "number")) {
    return res.status(400).json({ message: "If the coupon is limited quantity, distributed_amount and total_amount must be a number." });
  }

  // continue
  next();
}