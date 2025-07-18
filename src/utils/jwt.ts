// src/lib/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

const SECRET_KEY = new TextEncoder().encode('very-strong-secret')

export async function signToken(payload: JWTPayload, expiresIn: string = '1m'): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET_KEY)
}

export async function verifyToken<T = JWTPayload>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, SECRET_KEY, {
    algorithms: ['HS256'],
  })
  return payload as T
}
