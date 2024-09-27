import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

const outputParser = new StringOutputParser();

// LCEL == LangChain Expression Language Approach
const LCELApproach = async (model) => {
  const message = [
    new SystemMessage("Translate the following from English to Hindi"), // Helpful background context that tell the AI what to do
    new HumanMessage("Hello, how are you ?"), // Messages that are intented to represent the user
  ];

  /*
  let result = await model.invoke(message); // Method is used to invoke chatgpt to get the response
  // AI - Messages that show what the AI responded with (result)
  return await outputParser.invoke(result); // This is done to parser the AIMessage received from above into the plain text format
  */

  // Chaining together using pipe mthod to combine two components "model" and "outputParser"
  const chain = model.pipe(outputParser);
  return await chain.invoke(message);

};

export default LCELApproach;

