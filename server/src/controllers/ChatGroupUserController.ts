import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class ChatGroupUserController {
  static async index(req: Request, res: Response) {
    try {
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      return res.json({ message: "Date fetched successfully!", data: users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body;
      const name = body.name?.trim();

      if (!name || !body.group_id || !UUID_REGEX.test(body.group_id)) {
        return res.status(400).json({ message: "Invalid user details" });
      }

      const existingUser = await prisma.groupUsers.findFirst({
        where: {
          group_id: body.group_id,
          name,
        },
      });

      if (existingUser) {
        return res.json({
          message: "User synced successfully!",
          data: existingUser,
        });
      }

      try {
        const user = await prisma.groupUsers.create({
          data: {
            group_id: body.group_id,
            name,
          },
        });

        return res.json({ message: "User created successfully!", data: user });
      } catch (error) {
        const user = await prisma.groupUsers.findFirst({
          where: {
            group_id: body.group_id,
            name,
          },
        });

        if (user) {
          return res.json({ message: "User synced successfully!", data: user });
        }

        throw error;
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatGroupUserController;
