import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { throwError } from "../utils/error.util.js";
import { userRepository } from "../database/index.js";
import { ERRORS } from "../utils/error-status.util.js";
import { AdminDataSource } from "../config/admin.datasoure.js";
import { UserProfile } from "../entity/UserProfile.js";
const userProfileRepository = AdminDataSource.getRepository(UserProfile);

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


// services/user.service.ts
export const upsertUserProfile = async (data: any) => {
  const { user_id } = data;


  if (!user_id) {
    throw new Error("user_id is required");
  }


    const payload = {
    user_id: data.user_id,
    gender: data.gender,
    first_name: data.first_name,
    middle_name: data.middle_name ?? null,
    last_name: data.last_name,
    dob: data.dob,
    height_cm: data.height_cm ?? null,
    marital_status: data.marital_status,
    marriage_priority: data.marriage_priority,
    religion: data.religion,
    born_religion: data.born_religion,
    faith_level: data.faith_level,
    religious_commitment: data.religious_commitment,
    community: data.community ?? null,
    ethnicity: data.ethnicity ?? null,
    eat_halal: data.eat_halal,
    smoke: data.smoke,
    drink: data.drink,
    has_children: data.has_children,
    move_abroad: data.move_abroad,
    profession: data.profession,
    education_level: data.education_level,
    nationality: data.nationality,
    birth_country: data.birth_country,
    personality_tags: data.personality_tags ?? null,
    interests: data.interests ?? null,
    bio: data.bio ?? null,
  };

  await userProfileRepository.upsert(payload,[]);

return userProfileRepository.findOne({
  where: { user_id },
});
};
