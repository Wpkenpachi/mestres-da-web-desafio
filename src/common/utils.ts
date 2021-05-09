import bcrypt from 'bcrypt'

export const getTokenFromAuthorizationHeader = (payload: string): string => {
  const [Bearer, Token] = payload.split(' ')
  if (!Bearer || !Token) throw new Error('Invalid token')
  if (Bearer.toLowerCase() != 'bearer') throw new Error('Invalid token')
  return Token
}

export const checkPassword = async (plainPass: string, userPass: string): Promise<boolean> => {
  return await bcrypt.compare(plainPass, userPass)
}