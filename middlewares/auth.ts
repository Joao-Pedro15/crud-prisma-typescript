import { NextFunction, Request, Response } from "express";
import { verify, decode } from "jsonwebtoken";

export async function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) return false

  const [, token] = authHeader.split(" ");

  try {
    const verified = verify(token, String(process.env.SECRET))
    if(!verified) throw new Error('invalid token')

    // const { sub: userId } = decode(token);
    return next();
  } catch (err:any) {
    return err.message
  }
}