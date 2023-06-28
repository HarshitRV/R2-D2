/**
 * Under development. NOT IMPLEMENTED YET
 */

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_PERSONAL,
});

const openai = new OpenAIApi(configuration);

export const openaiImageGen = async (msg, args) => {
	try {
		args.shift();
		const prompt = args.join(" ");

		if (msg.author.id !== process.env.OWNER_ID) {
			msg.channel.send("You are not allowed to use this command.");
			console.log("Unauthorized user tried to use chatGPT", msg.author);
			return;
		}

		if (args.length === 1) {
			msg.channel.send("invalid prompt");
			return;
		}

		console.log(msg.author);

		// costs 1.31 rupees per request
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: "256×256",
		});

		const { data } = response;
		console.log(data);
	} catch (e) {}
};
