import { v4 as uuid } from "uuid"

export const generateVerificationToken = () => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  return { token, expires }
}
