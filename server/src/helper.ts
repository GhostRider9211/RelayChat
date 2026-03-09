import { producer, consumer } from "./config/kafka.config.js";
import prisma from "./config/prisma.js";

export const produceMessage = async (topic: string, message: any) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
};

export const consumeMessages = async (topic: string) => {
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value!.toString());
            try {
                await prisma.chats.create({
                    data: {
                        group_id: data.group_id,
                        message: data.message,
                        name: data.name,
                        file: data.file,
                    },
                });
            } catch (err) {
                console.error("Failed to save message to database:", err);
            }
        },
    });
};
