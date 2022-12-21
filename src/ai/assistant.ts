import JSONdb from "simple-json-db";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

export class Assistant {
  configuration: Configuration;
  openai: OpenAIApi;
  db: JSONdb;

  constructor(dbJsonFileLocation: string = "assitant_db.json") {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
    this.db = new JSONdb(dbJsonFileLocation);
  }

  ask = async (uid: string, question: string) => {
    const context = this.db.get(uid);
    if (context) {
      const prompt =
        context +
        `
        Human: ${question}
        AI:`;
      const response = await this.createCompletion(prompt);
      this.db.set(uid, context + response.data.choices[0].text);

      return response.data.choices[0].text;
    } else {
      return await this.createAndSetNewContext(uid, question);
    }
  };

  createAndSetNewContext = async (uid: string, question: string) => {
    const starter = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

    Human: Hello, who are you?
    AI: I am an AI created by OpenAI. How can I help you today?
    Human: ${question}
    AI:`;
    const response = await this.createCompletion(starter);
    this.db.set(uid, starter + response.data.choices[0].text);
    return response.data.choices[0].text;
  };

  createCompletion = async (prompt: string) => {
    return await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
  };
}
