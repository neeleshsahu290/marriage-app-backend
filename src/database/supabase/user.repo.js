import  Supabase  from "../../config/supabase.js";
import { UserRepository } from "../user.repository.js";

export class SupabaseUserRepository extends UserRepository {
  async findByPhone(phone) {
    const { data, error } = await Supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async findByEmail(email) {
    const { data, error } = await Supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async create(payload) {
    const { data, error } = await Supabase
      .from("users")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
