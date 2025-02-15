import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        // To enable api requests in bruno
        const whiteList = [process.env.FRONTEND_URL]

        if (process.argv[2] === '--api') {
            whiteList.push(undefined) // To enable api requests in bruno
        }
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('CORS error'))
        }
    }
}