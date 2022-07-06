const redis = require("redis")
const redisClient = redis.createClient({
    socket: {
    host: "redis",
    port: 6379
    }
});

async function redisConnection() {
    await redisClient.connect().then(() => {
        redisClient.ping();
    });
};

redisConnection();

module.exports = redisClient;