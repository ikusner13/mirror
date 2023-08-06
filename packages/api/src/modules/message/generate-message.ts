import { Configuration, OpenAIApi } from "openai";

const openai_key = "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";

const configuration = new Configuration({
  apiKey: openai_key,
});
const openai = new OpenAIApi(configuration);

async function generateMessage() {
  try {
    const completion = await openai.createCompletion({
      max_tokens: 32,
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 1.5,
    });
    console.log(completion);
    console.log(completion.data.choices[0]?.text);
  } catch (error) {
    console.log(error);
  }
}

function generatePrompt() {
  return `Give me a good morning message to send to my girlfriend:
  
  `;
}

generateMessage();
