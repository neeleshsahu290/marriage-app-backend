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

   const status =
      err.status ||
      err.statusCode ||
      err.httpCode ||
      500;

    const code =
      err.code ||
      err.errorCode ||
      'internal_server_error';

    const message =
      err.message ||
      err.error ||
      'Internal server error';

    return res.status(status).json({
      success: false,
      code,
      message,
    });
  
  }
}

export = new ErrorResponse();
