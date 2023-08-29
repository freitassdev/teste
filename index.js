//Setup
import App from "./src/index.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "config.env" });
const index = new App();
index.run();