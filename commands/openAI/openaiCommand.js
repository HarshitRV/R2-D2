const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
});

const openai = new OpenAIApi(configuration);


const options = (question) => {
  return {
    model: "text-davinci-002",
    prompt: question,
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  }
}

const reply = async (question) => {
    const response  =  await openai.createCompletion(options(question));
    return response.data.choices[0].text;
}

/**
 * 
 * @param {Object} msg - Message object
 * @param {Array} args - Strings array with the command arguments
 */
module.exports.openAI = async (msg, args) => {
  try {
    if(args.length === 1) {
      msg.channel.send("You need to provide a question to ask R2D2.");
    } else {
      args.shift();
      question = args.join(" ");
      const response = await reply(question);
      msg.channel.send(response);
    }
  } catch (e) {
    console.log(e);
    msg.channel.send("Too many requests. Please try again later or contact support.");
    msg.channel.send("discord.gg/9qtAg79ahW")
  }
}