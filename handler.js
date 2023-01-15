import sls from "serverless-http";
import app from "./index.js"


export const hello = sls(app)
