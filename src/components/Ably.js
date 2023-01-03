import { Realtime } from "ably/build/ably-commonjs.js"

export default new Realtime(process.env.REACT_APP_ABLY_API_KEY)