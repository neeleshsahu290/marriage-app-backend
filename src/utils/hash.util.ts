import bcrypt from "bcryptjs";

/**
 * Hash plain password
 */
export const hashPassword = async (password: string): Promise<string | null> => {
  if (!password) return null;
  return bcrypt.hash(password, 12);
};

/**
 * Compare plain password with hash
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
};
