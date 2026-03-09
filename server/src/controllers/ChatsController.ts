import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class ChatsController {
  static async index(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      if (!groupId || !UUID_REGEX.test(groupId)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      const chats = await prisma.chats.findMany({
        where: {
          group_id: groupId,
        },
      });
      return res.json({ data: chats });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatsController;
