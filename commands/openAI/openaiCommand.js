import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
});

const openai = new OpenAIApi(configuration);


const options = (question) => {
  return {
    model: "text-ada-001",
    prompt: `Human: ${question}`,
    temperature: 0.9,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  }
}

const reply = async (question) => {
    const response  =  await openai.createCompletion(options(question));
    console.log(response.data.choices)
    return response.data.choices[0].text;
}

/**
 * 
 * @param {Object} msg - Message object
 * @param {Array} args - Strings array with the command arguments
 */
export const openAI = async (msg, args) => {
  try {
    console.log(args);
    if(args.length === 1) {
      msg.channel.send("You need to provide a question to ask R2D2.");
    } else {
      args.shift();
      const question = args.join(" ");
      console.log(question);
      const response = await reply(question);
      msg.channel.send(response);
    }
  } catch (e) {
    console.log(e);
    msg.channel.send("Usage limit exceeded.");
    msg.channel.send("For any query join , discord.gg/9qtAg79ahW");
  }
}