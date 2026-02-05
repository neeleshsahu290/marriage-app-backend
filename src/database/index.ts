import { SupabaseUserRepository } from "./supabase/user.repo";
import { SupabaseAuthRepository } from "./supabase/auth.repo";

//  Change this line in future
export const userRepository = new SupabaseUserRepository();
export const authRepository = new SupabaseAuthRepository();
