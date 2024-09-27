import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const outputParser = new StringOutputParser();

const promptTemplateApproach = async (
  model,
  user_input,
  language_to_convert_into
) => {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "Translate the following into {language}"],
    ["user", "{text}"],
  ]);

  /*
  // Creating the prompt template
  let prompt = await promptTemplate.invoke({
    language: language_to_convert_into,
    text: user_input,
  });
  // Invoking the model with the prompt
  const result = await model.invoke(prompt);
  return await outputParser.invoke(result); // This is done to parser the AIMessage received from above into the plain text format
  */

  const chain = promptTemplate.pipe(model).pipe(outputParser);

  return await chain.invoke({ language: language_to_convert_into, text: user_input });
};

export default promptTemplateApproach;
