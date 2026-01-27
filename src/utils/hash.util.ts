import bcrypt from "bcryptjs";

/**
 * Hash plain password
 * @param {string} password
 * @returns {Promise<string>}
 */
export const hashPassword = async (password) => {
  if (!password) return null;
  return bcrypt.hash(password, 12);
};

/**
 * Compare plain password with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hash) => {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
};
