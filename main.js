import "dotenv/config";
import readlineSync from "readline-sync";
import client from "./config/open-ai-config.js";
import sequelize from "./config/database-config.js";
import pc from "picocolors";
import { addChatHistory, getOldChatHistory } from "./services/chat-service.js";

async function main() {
  let day_time = "";
  let hrs = new Date().getHours();

  switch (true) {
    case hrs > 1 && hrs <= 4:
      day_time = "mid-night";
      break;
    case hrs > 4 && hrs <= 11:
      day_time = "morning";
      break;
    case hrs > 11 && hrs <= 16:
      day_time = "after-noon";
      break;
    case hrs > 16 && hrs <= 21:
      day_time = "evening";
      break;
    case hrs > 21 && hrs <= 24:
      day_time = "night";
      break;
    default:
      day_time = "wake-up";
  }

  console.log(
    pc.white(`Hey, What's up ! I am "Sia" Your Personnal Assistant.
        \nLet's see the hours in your clock. It's ${hrs}'O clock - ${day_time}! No worries, I am there to help you anytime :-) Go Ahead`)
  );

  while (true) {
    let user_id = 2;
    const question = readlineSync.question(`You: `);
    try {
      if (question.toLowerCase() === "exit;") {
        return;
      }

      let chatHistory = await getOldChatHistory(user_id);

      let summary = [{ role: "user", content: question }];
      if (chatHistory)
        chatHistory.forEach((chat) => {
          if (chat.text_type == 1)
            summary.push({ role: "user", content: chat.text });
          else return summary.push({ role: "assistant", content: chat.text });
        });

      let response = await client.chat.completions.create({
        messages: summary,
        model: process.env.MODEL_VERSION,
      });

      const answer = response.choices[0].message.content;

      if (question && question != "") {
        await addChatHistory(user_id, question, 1);
        await addChatHistory(user_id, answer, 2);
      }
      console.log(pc.yellow(`Assitant: ${answer}`));
    } catch (error) {
      console.log(
        pc.red(`Error: Error Occured setting openAI client ${error}`)
      );
    }
  }
}

main();
