import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("connect", () => {
    console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err);
});

const connectRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error("Redis connection failed:", error);
    }
};

export { redisClient };
export default connectRedis;