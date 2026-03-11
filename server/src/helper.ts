import prisma from "./config/prisma.js";

export const saveMessage = async (data: {
  group_id: string;
  message?: string;
  name: string;
  file?: string;
}) => {
  await prisma.chats.create({
    data: {
      group_id: data.group_id,
      message: data.message,
      name: data.name,
      file: data.file,
    },
  });
};
