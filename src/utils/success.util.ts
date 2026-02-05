import { Response } from "express";

export const success = <T>(
  res: Response,
  status: number,
  data: T,
  message: string | null = null
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
