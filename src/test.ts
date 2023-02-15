// const { Configuration, OpenAIApi } = require("openai");

const { Assistant } = require("./ai/assistant.ts");

// require("dotenv").config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const start = async () => {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt:
//       "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
//     temperature: 0.9,
//     max_tokens: 150,
//     top_p: 1,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.6,
//     stop: [" Human:", " AI:"],
//   });
//   console.log(response.data.choices[0].text);
// };

// start();

const t = async () => {
  const ai = new Assistant();
  //console.log(await ai.ask("919325410051", "Do you know what is my name?"));
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const loop = () => {
    readline.question(`You: `, async (question: string) => {
      console.log(`AI: ${await ai.ask("your-unique-id-here", question)}`);
      loop();
    });
  };
  loop();
};

t();
