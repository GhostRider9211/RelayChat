import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export interface LoginPayLoadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}
class AuthController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayLoadType = request.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
        expiresIn: "365d",
      });
      return response.json({
        message: "Logged in sucessfully",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: "Something went wrong",
        error,
      });
    }
  }
}
export default AuthController;
