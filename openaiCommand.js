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

module.exports = reply;