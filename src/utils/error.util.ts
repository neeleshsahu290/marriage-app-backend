export const throwError = (status: number, message: string): never => {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  throw error;
};
