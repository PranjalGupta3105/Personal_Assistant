import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();
import gptResponse from "./helpers/chatBot.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const modelInstance = new ChatOpenAI({
  model: "gpt-4",
  apiKey: process.env.OPEN_API_KEY,
});

let messagesHistory = [];

let user_input = "What is your name?";
messagesHistory.push(new HumanMessage({ content: user_input }));
let response = await gptResponse(modelInstance, user_input);
messagesHistory.push(new AIMessage({ content: response }));
console.log(messagesHistory);
