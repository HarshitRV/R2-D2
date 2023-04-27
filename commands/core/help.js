/**
 * Node Modules
 */
import { MessageEmbed } from "discord.js";

/**
 * Utils imports
 */
import { getMonitorStatus } from "../../utils/uptimeRobot.js";

/**
 * @description - Shows all bot commands.
 * @param {Object} msg - Message object
 */
export const help = async (msg, prefix) => {
	try {
		const monitorStatus = await getMonitorStatus(
			process.env.UPTIME_API_KEY,
			"R2-D2 Music-Bot-Copy",
			"R2-D2 Music Bot"
		);

		const musicValue =
			monitorStatus.status === 2 ? "🟢 Currently Online" : "🔴 Currently Down";

		const embed = new MessageEmbed()
			.setAuthor("R2-D2™|Help", "https://i.imgur.com/7Mb8CAT.png")
			.setTitle("Hey there 👋. Help has arrived")
			.setDescription(`**Prefix:**  \`${prefix}\`\n\n**Fun Commands**`)
			.addFields(
				{
					name: `🎶 ${prefix}music`,
					value: `Opens the music panel to play music. ${musicValue}`,
				},
				{
					name: `🤖 ${prefix}r2d2 <Your question>`,
					value: `Ask me anything. (Powered by OpenAI)`,
				},
				{
					name: `❛❜ ${prefix}starwars`,
					value: `Generates random starwars quote`,
				},
				{
					name: `😹 ${prefix}meme`,
					value: `Generates random meme`,
				},
				{
					name: `😏 ${prefix}sarcasm`,
					value: `Get random Chandler Bing quotes(exclusive command)`,
				},
				{
					name: `🧐 ${prefix}phil`,
					value: `Get random Phil Dunphy's philosophy of life.`,
				},
				{
					name: `☠️ ${prefix}quote`,
					value: `Get random quotes from the movie Fight Club(exclusive command)`,
				},
				{
					name: `🤣 ${prefix}kanye`,
					value: `Generates random Kanye West quote`,
				},
				{
					name: `👨‍🏫 ${prefix}av`,
					value: `Shows your avatar`,
				},
				{
					name: `\u200b`,
					value: `**[Invite Me 🔗](https://discord.com/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot)**`,
					inline: true,
				},
				{
					name: `\u200b`,
					value: `**[Vote Me 😘](https://top.gg/bot/854977056022331423/vote)**`,
					inline: true,
				},
				{
					name: `\u200b`,
					value: `**[Donate ☕️](https://ko-fi.com/harshitrv)**`,
					inline: true,
				},
				{
					name: `\u200b`,
					value: `**[Support 🚀](https://discord.com/invite/9qtAg79ahW)**`,
					inline: true,
				}
			)
			.setColor(0x0949ee)
			.setTimestamp()
			.setFooter("Dev | WOLVERINE911#3940", "https://i.imgur.com/I6lsh5r.jpg");
		msg.channel.send(embed);
	} catch (e) {
		console.log(e);
	}
};

/**
 * @description - Shows all music commands.
 * @param {Object} msg - Message object
 */
export const musicHelp = async (msg, prefix) => {
	try {
		const monitorStatus = await getMonitorStatus(
			process.env.UPTIME_API_KEY,
			"R2-D2 Music-Bot-Copy",
			"R2-D2 Music Bot"
		);

		const title =
			monitorStatus.status === 2
				? "🟢 Online | Get in the groove 🎵 🎵"
				: "🔴 Offline | Music service is down";

		const embed = new MessageEmbed()
			.setAuthor("R2-D2™|Music Panel", "https://i.imgur.com/7Mb8CAT.png")
			.setTitle(title)
			.setDescription(`**User slash commands for music** `)
			.setColor(0x0949ee)
			.setTimestamp()
			.setFooter(
				`Requested by ${msg.author.username}`,
				msg.author.displayAvatarURL()
			);
		msg.channel.send(embed);
	} catch (e) {
		console.log(e);
	}
};

/**
 * @description - Show music filters.
 * @param {Object} msg - Message object
 * @param {String} prefix - The bot prefix
 */
export const filterHelp = (msg, prefix) => {
	try {
		const embed = new MessageEmbed()
			.setAuthor("R2-D2™|Filter", "https://i.imgur.com/7Mb8CAT.png")
			.setTitle("Apply these awesome filters.🎵 🎵")
			.setDescription(
				`**Note:** Longer the song, longer it will take to apply the filter`
			)
			.addField(
				"Filters",
				"bassboost_low | bassboost | bassboost_high | 8D | vaporwave | nightcore | phaser | tremolo | vibrato | reverse | treble | normalizer | normalizer2 | surrounding | pulsator | subboost | karaoke | flanger | gate | haas | mcompand | mono | mstlr | mstrr | compressor | expander | softlimiter | chorus | chorus2d | chorus3d | fadein | dim | earrape",
				true
			)
			.addFields(
				{
					name: `\u200b`,
					value: `**[Invite Me➕](https://discord.com/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot)**`,
				},
				{
					name: `\u200b`,
					value: `**[Vote Me 😘](https://top.gg/bot/854977056022331423/vote)**`,
				},
				{
					name: `\u200b`,
					value: `**[Donate ☕️](https://ko-fi.com/harshitrv)**`,
					inline: true,
				},
				{
					name: `\u200b`,
					value: `**Credits:** **[ZerioDev](https://github.com/ZerioDev)**`,
				}
			)
			.setColor(0x0949ee)
			.setTimestamp()
			.setFooter(
				`Requested by ${msg.author.username}`,
				msg.author.displayAvatarURL()
			);
		msg.channel.send(embed);
	} catch (e) {
		console.log(e);
	}
};
