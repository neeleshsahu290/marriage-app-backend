import { SupabaseUserRepository } from "./supabase/user.repo.js";
import { SupabaseAuthRepository } from "./supabase/auth.repo.js";

//  Change this line in future
export const userRepository = new SupabaseUserRepository();
export const authRepository = new SupabaseAuthRepository();
