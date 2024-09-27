import { ChatOpenAI } from "@langchain/openai";
// import LCELApproach from "./helpers/lcelApproach.js";
import promptTemplateApproach from "./helpers/promptTemplateApproach.js"
import * as dotenv from "dotenv";
dotenv.config();

const modelInstance = new ChatOpenAI({ model: "gpt-4", apiKey: process.env.OPEN_API_KEY});
// console.log(await LCELApproach(modelInstance));
console.log(await promptTemplateApproach(modelInstance, "How are looking very handsome today", "italian"));
