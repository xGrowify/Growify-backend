import crypto from "crypto";
import { Resend } from "resend";

export function generateResetToken(): string {
  return crypto.randomBytes(20).toString("hex");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmailWithResend(
  email: string,
  resetLink: string
) {
  try {
    await resend.emails.send({
      from: "waitlist@devlly.arihant.us",
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link will expire in 1 hour.</p>`,
    });
  } catch (error) {
    console.error("Failed to send reset email:", error);
    throw new Error("Failed to send reset email");
  }
}
