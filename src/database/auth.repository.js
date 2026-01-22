/**
 * Auth Repository Interface
 * Any auth provider (Supabase / Firebase / Custom) MUST implement this
 */
export class AuthRepository {
  sendEmailOtp(email) {
    throw new Error("Method not implemented");
  }

  verifyEmailOtp(email, otp) {
    throw new Error("Method not implemented");
  }

  sendPhoneOtp(phone) {
    throw new Error("Method not implemented");
  }

  verifyPhoneOtp(phone, otp) {
    throw new Error("Method not implemented");
  }
}
