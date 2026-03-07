import {Redis} from 'ioredis';

const redis  = new Redis({
    host:  "localhost" ,                                // process.env.REDIS_HOST,
    port: 6379,                                        // parseInt(process.env.REDIS_PORT || "6379"),
})

export default redis;