import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    ssl: process.env.KAFKA_SSL === "true",
    sasl: process.env.KAFKA_USERNAME ? {
        mechanism: "scram-sha-256",
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD!,
    } : undefined,
    logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });
export const admin = kafka.admin();

export const connectKafka = async () => {
    await admin.connect();
    const topics = await admin.listTopics();
    if (!topics.includes("chats")) {
        await admin.createTopics({
            topics: [{ topic: "chats", numPartitions: 1 }],
        });
    }
    await admin.disconnect();

    await producer.connect();
    await consumer.connect();
    console.log("Kafka Connected...");
};

