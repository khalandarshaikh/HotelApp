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
    const maxRetries = Number(process.env.REDIS_MAX_RETRIES) || 5;
    const baseDelay = Number(process.env.REDIS_RETRY_DELAY_MS) || 500; // ms

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    if (redisClient.isOpen) return;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await redisClient.connect();
            // connect event will log success
            return;
        } catch (error) {
            console.error(`Redis connection attempt ${attempt} failed:`, error);
            if (attempt === maxRetries) {
                console.error(`All ${maxRetries} Redis connection attempts failed.`);
                break;
            }
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Retrying Redis connect in ${delay}ms...`);
            await wait(delay);
        }
    }
};

export { redisClient };
export default connectRedis;