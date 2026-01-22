import Supabase from "../../config/supabase.js";
import { AuthRepository } from "../auth.repository.js";

export class SupabaseAuthRepository extends AuthRepository {
  async sendEmailOtp(email) {
    const { error } = await Supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      throw error;
    }

    return true;
  }

  async verifyEmailOtp(email, otp) {
    const { data, error } = await Supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      throw error;
    }

    return {
      auth_user_id: data.user.id,
      access_token: data.session.access_token,
      expires_at: data.session.expires_at,
    };
  }

    async sendPhoneOtp(phone) {
    const { error } = await Supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      throw error;
    }

    return true;
  }

  async verifyPhoneOtp(phone, otp) {
    const { data, error } = await Supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      throw error;
    }

    return {
      auth_user_id: data.user.id,
      access_token: data.session.access_token,
      expires_at: data.session.expires_at,
    };
  }
}
