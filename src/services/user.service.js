import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { throwError } from "../utils/error.util.js";
import { userRepository } from "../database/index.js";
import { ERRORS } from "../utils/error-status.util.js";

/**
 * CREATE USER SERVICE
 */
export const createUserService = async (payload) => {
  const { phone, email, password } = payload;

  if (!phone && !email) {
    throwError(ERRORS.BAD_REQUEST, "Phone or email is required");
  }

  // Check if user already exists
  const existingUser = phone
    ? await userRepository.findByPhone(phone)
    : await userRepository.findByEmail(email);

  if (existingUser) {
    throwError(ERRORS.CONFLICT, "User already exists");
  }

  const passwordHash = password ? await hashPassword(password) : null;

  const user = await userRepository.create({
    phone: phone || null,
    email: email || null,
    password_hash: passwordHash,
    phone_verified: false,
    email_verified: false,
    onboarding_completed: false,
    is_active: true,
  });

  return {
    user_id: user.user_id,
    phone: user.phone,
    email: user.email,
    onboarding_completed: user.onboarding_completed,
    is_active: user.is_active,
    created_at: user.created_at,
  };
};

/**
 * LOGIN SERVICE
 */
export const loginService = async ({ identifier, password }) => {
  if (!identifier || !password) {
    throwError(ERRORS.BAD_REQUEST, "Phone/email and password are required");
  }

  //  detect email vs phone
  const isEmail = identifier.includes("@");

  const user = isEmail
    ? await userRepository.findByEmail(identifier)
    : await userRepository.findByPhone(identifier);

  if (!user || !user.password_hash) {
    throwError(ERRORS.UNAUTHORIZED, "Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) {
    throwError(ERRORS.UNAUTHORIZED, "Invalid credentials");
  }

  if (!user.is_active) {
    throwError(ERRORS.FORBIDDEN, "Account is inactive");
  }

  return {
    access_token: generateToken({ user_id: user.user_id }),
    user: {
      user_id: user.user_id,
      onboarding_completed: user.onboarding_completed,
    },
  };
};
