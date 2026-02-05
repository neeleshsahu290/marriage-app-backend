import { DeepPartial } from "typeorm";

import { hashPassword, comparePassword } from "../utils/hash.util";
//import { generateToken } from "../utils/jwt.util.js";
import { throwError } from "../utils/error.util";
//import { userRepository } from "../database/index.js";
import { ERRORS } from "../utils/error-status.util";
import { AdminDataSource } from "../config/admin.datasoure";
import { UserProfile } from "../entity/UserProfile";
import { User } from "../entity/User";
import { generateToken } from "../utils/jwt.util";
import { email } from "zod";
import { UserPreference } from "../entity/UserPreference";
const userProfileRepository = AdminDataSource.getRepository(UserProfile);
const userRepository = AdminDataSource.getRepository(User);
const userPreferenceRepository =  AdminDataSource.getRepository(UserPreference)

/**
 * CREATE USER SERVICE
 */
export const createUserService = async (payload: any) => {
  const { phone, email, password,phone_verified, email_verified} = payload;

  if (!phone && !email) {
    throwError(ERRORS.BAD_REQUEST, "Phone or email is required");
  }

  const existingUser = await userRepository.findOne({
    where: [phone ? { phone } : {}, email ? { email } : {}],
  });

  if (existingUser) {
    throwError(ERRORS.CONFLICT, "User already exists");
  }

  if (!password) {
    throwError(ERRORS.BAD_REQUEST, "Password is required");
  }

  const passwordHash = await hashPassword(password);

  const user = userRepository.create({
    phone: phone ?? null,
    email: email ?? null,
    password_hash: passwordHash,
    phone_verified: phone_verified??false,
    email_verified: email_verified??false,
    onboarding_completed: false,
    is_active: true,
  } as DeepPartial<User>);

  const savedUser = await userRepository.save(user);

 return {
      access_token: generateToken({ user_id: user!.id }),

  user: {
    user_id: savedUser.id,
    phone: savedUser.phone,
    email: savedUser.email,
    is_active: user!.is_active,
    show_online_status: user!.show_online_status,
    show_email: user!.show_email,
    show_phone: user!.show_phone,
    photo_visibility: user!.photo_visibility,
    onboarding_completed: user!.onboarding_completed,
    created_at: savedUser.created_at,
  }
}
};



/**
 * LOGIN SERVICE
 */
export const loginService = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  if (!identifier || !password) {
    throwError(ERRORS.BAD_REQUEST, "Phone/email and password are required");
  }

  const isEmail = identifier.includes("@");

  const user = await userRepository.findOne({
    where: isEmail ? { email: identifier } : { phone: identifier },
  });

  if (!user || !user.password_hash) {
    throwError(ERRORS.UNAUTHORIZED, "Invalid credentials");
  }

  const isValid = await comparePassword(password, user!.password_hash);

  if (!isValid) {
    throwError(ERRORS.UNAUTHORIZED, "Invalid credentials");
  }

  if (!user!.is_active) {
    throwError(ERRORS.FORBIDDEN, "Account is inactive");
  }

  const profile = await userProfileRepository.findOne({
    where: { user_id: user!.id },
  });
  return {
    access_token: generateToken({ user_id: user!.id }),
    user: {
      user_id: user!.id,
      email: user!.email,
      phone: user!.phone,
      is_active: user!.is_active,
      show_online_status: user!.show_online_status,
      show_email: user!.show_email,
      show_phone: user!.show_phone,
      photo_visibility: user!.photo_visibility,
      onboarding_completed: user!.onboarding_completed,
      profile: profile,
    },
  };
};

/**
 * GET ALL Users
 */
export const getAllProfilesService = async () => {
  return userRepository.find({
    order: {
      created_at: "DESC",
    },
  });
};

/**
 * UPSERT USER PROFILE
 */
export const upsertUserProfile = async (data: Partial<UserProfile>) => {
  const { user_id } = data;

  if (!user_id) {
    throw new Error("user_id is required");
  }

  const payload: Partial<UserProfile> = {
    user_id: data.user_id,
    full_name: data.full_name,
    dob: data.dob,
    gender: data.gender,
    height_cm: data.height_cm ?? undefined,

    religion: data.religion,
    religious_faith: data.religious_faith,

    languages_known: data.languages_known ?? null,
    bio: data.bio ?? undefined,

    marital_status: data.marital_status,
    has_children: data.has_children,
    family_type: data.family_type,
    parents_status: data.parents_status,

    education_level: data.education_level,
    profession: data.profession,

    personality_traits: data.personality_traits ?? null,
    hobbies: data.hobbies ?? null,
    profile_photos: data.profile_photos ?? null,
    habits: data.habits ?? null,

    marriage_priority: data.marriage_priority,
  };

  await userProfileRepository.upsert(payload, ["user_id"]);

  return userProfileRepository.findOne({
    where: { user_id },
  });
};

export const upsertUserPreferences = async (
  data: Partial<UserPreference>,
) => {
  const { user_id } = data;

  if (!user_id) {
    throw new Error("user_id is required");
  }

  const payload: Partial<UserPreference> = {
    user_id: data.user_id,
    min_age: data.min_age,
    max_age: data.max_age,
    max_distance_km: data.max_distance_km,
    min_education_level: data.min_education_level ,
  };

  await userPreferenceRepository.upsert(
    payload,
    ["user_id"],
  );

  return userPreferenceRepository.findOne({
    where: { user_id },
  });
};

export const createUsersWithProfilesBulkService = async (payload: any) => {
  const { users } = payload;

  if (!Array.isArray(users) || users.length === 0) {
    throwError(ERRORS.BAD_REQUEST, "Users list is required");
  }

  const createdUsers: any[] = [];
  const failedUsers: any[] = [];

  for (const item of users) {
    try {
      const { profile, ...userPayload } = item;

      //  Reuse existing user creation logic
      const createdUser = await createUserService(userPayload);
      console.log(createdUser);

      let savedProfile = null;

      //  Reuse existing profile upsert logic
      if (profile) {
        savedProfile = await upsertUserProfile2({
          user_id: createdUser.user.user_id,
          ...profile,
        });
      }

      createdUsers.push({
        ...createdUser,
        profile: savedProfile,
      });
    } catch (err: any) {
      failedUsers.push({
        input: item,
        reason: err?.message || "Failed",
      });
    }
  }

  return {
    success_count: createdUsers.length,
    failed_count: failedUsers.length,
    users: createdUsers,
    failed: failedUsers,
  };
};

export const upsertUserProfile2 = async (data: Partial<UserProfile>) => {
  const { user_id } = data;

  if (!user_id) {
    throw new Error("user_id is required");
  }

  // Only assign fields if present
  const payload: any = { user_id };

  const fields = [
    "full_name",
    "dob",
    "gender",
    "height_cm",
    "religion",
    "religious_faith",
    "languages_known",
    "bio",
    "marital_status",
    "has_children",
    "family_type",
    "parents_status",
    "education_level",
    "profession",
    "personality_traits",
    "hobbies",
    "profile_photos",
    "habits",
    "marriage_priority",
  ];

  for (const key of fields) {
    if (data[key as keyof UserProfile] !== undefined) {
      payload[key] = data[key as keyof UserProfile];
    }
  }

  await userProfileRepository.upsert(payload, {
    conflictPaths: ["user_id"], // TypeORM v0.3+ safe way
  });

  return userProfileRepository.findOne({
    where: { user_id },
  });
};

export const USER_SINGLE_UPDATE_FIELDS = [
  "show_online_status",
  "show_email",
  "show_phone",
  "photo_visibility",
] as const;

type UserUpdatableField =
  | "show_online_status"
  | "show_email"
  | "show_phone"
  | "photo_visibility";

export const updateSingleUserFieldService = async (payload: {
  user_id: string;
  field: UserUpdatableField;
  value: any;
}) => {
  const { user_id, field, value } = payload;

  if (!user_id || !field) {
    throwError(ERRORS.BAD_REQUEST, "user_id and field are required");
  }

  if (!USER_SINGLE_UPDATE_FIELDS.includes(field)) {
    throwError(ERRORS.BAD_REQUEST, "Field not allowed to update");
  }

  const user = await userRepository.findOne({
    where: { id: user_id },
  });

  if (!user) {
    throwError(ERRORS.NOT_FOUND, "User not found");
  }

  if (
    ["show_online_status", "show_email", "show_phone"].includes(field) &&
    typeof value !== "boolean"
  ) {
    throwError(ERRORS.BAD_REQUEST, `${field} must be boolean`);
  }

  if (field === "photo_visibility" && typeof value !== "string") {
    throwError(ERRORS.BAD_REQUEST, "Invalid photo_visibility value");
  }

  (user as any)[field] = value;

  const updatedUser = await userRepository.save(user!);

  return {
    user_id: updatedUser.id, // UUID returned
    field,
    value: (updatedUser as any)[field],
    updated_at: updatedUser.updated_at,
    //user:updatedUser
  };
};



export const updateMultipleUserFieldsService = async (payload: {
  user_id: string;
  fields: Partial<{
    show_online_status: boolean;
    show_email: boolean;
    show_phone: boolean;
    photo_visibility: "hidden" | "blurred_preview" | "visible_to_matches";
  }>;
}) => {
  const { user_id, fields } = payload;
  console.log("one");

  if (!user_id || !fields || Object.keys(fields).length === 0) {
    throwError(ERRORS.BAD_REQUEST, "user_id and fields are required");
  }
    console.log("two");


  const allowedFields = ["show_online_status", "show_email", "show_phone", "photo_visibility"];
  const invalidFields = Object.keys(fields).filter(f => !allowedFields.includes(f));
  if (invalidFields.length > 0) {
    throwError(ERRORS.BAD_REQUEST, `Fields not allowed to update: ${invalidFields.join(", ")}`);
  }
      console.log("two");


  const user = await userRepository.findOne({ where: { id: user_id } });
  console.log(user);

  if (!user) {
    throwError(ERRORS.NOT_FOUND, "User not found");
  }

  // Type checks
  for (const [key, value] of Object.entries(fields)) {
    if (["show_online_status", "show_email", "show_phone"].includes(key)) {
      if (typeof value !== "boolean") {
        throwError(ERRORS.BAD_REQUEST, `${key} must be boolean`);
      }
    }
    if (key === "photo_visibility") {
      if (!["hidden", "blurred_preview", "visible_to_matches"].includes(value as string)) {
        throwError(ERRORS.BAD_REQUEST, "Invalid photo_visibility value");
      }
    }
    (user as any)[key] = value;
  }

  const updatedUser = await userRepository.save(user!);

  return {
    user_id: updatedUser.id,
    updated_fields: fields,
    updated_at: updatedUser.updated_at,
  };
};
