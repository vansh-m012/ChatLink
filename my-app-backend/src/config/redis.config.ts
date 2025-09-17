import {Redis} from "ioredis"

const redis= new Redis( {
    host: "localhost",
    port: 6379   // default port for the redis
})

export default redis;