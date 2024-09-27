import { StringOutputParser } from "@langchain/core/output_parsers";
const outputParser = new StringOutputParser();

const gptResponse = async (model, messagesHistory) => {

  const assitant_response = await model.invoke(messagesHistory);

  const assitant_response_string = await outputParser.invoke(assitant_response); // This is done to parser the AIMessage received from above into the plain text format

  return assitant_response_string;
};

export default gptResponse;
