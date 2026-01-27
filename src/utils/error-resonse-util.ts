import { NextFunction, Request, Response } from "express";
 import { ZodError } from "zod";
 //  import Logger from "../config/winston";
class ErrorResponse {
  defaultMethod(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // logger.logger.error(
    //   `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
    //     req.method
    //   } - ${req.ip}`
    // );

    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Api Validation Error",
        success: false,
        details: err,
      });
    }

    res.status(err.statusCode || 500).json({
      error: err.message || "Internal server error",
      success: false,
    });
  }
}

export = new ErrorResponse();
