import { Resend } from "resend"

import VerificationEmail from "@/components/emails/VerificationEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  // * NOTE: change the URL to production URL
  const confirmLink = `http://localhost:3000/verify?token=${token}`

  try {
    await resend.emails.send({
      from: "onboardingn@resend.dev",
      to: email,
      subject: `Welcome ${name}! Verify Your Email`,
      react: VerificationEmail({ link: confirmLink, name }),
    })
    return { success: true, message: "Verification email sent successfully." }
  } catch (emailError) {
    console.error("Error sending verification email:", emailError)
    return { success: false, message: "Failed to send verification email." }
  }
}
