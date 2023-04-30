import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

/**
 *
 * @param {Object} msg - Message object
 * @param {Array} args - Strings array with the command arguments
 */
export const chatGPTCompletion = async (msg, args) => {
	try {
		args.shift();
		const question = args.join(" ");

		if (msg.author.id !== process.env.OWNER_ID) {
			msg.channel.send("You are not allowed to use this command.");
			console.log("Unauthorized user tried to use chatGPT", msg.author)
			return;
		}

		if (args.length === 1) {
			msg.channel.send("Too short question");
			return;
		} else {
			console.log(msg.author);
			const messages = [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: question },
			];

			const chatGPT = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages,
			});

			const chatGPTmessage = chatGPT.data.choices[0].message;
			msg.channel.send(chatGPTmessage.content);
		}
	} catch (e) {
		console.log(e);
		msg.channel.send("Usage limit exceeded.");
	}
};
