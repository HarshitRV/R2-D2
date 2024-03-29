import { MessageEmbed } from "discord.js";
import https from "https";

/**
 * @description - Get a random chandler bing sarcastic comment.
 * @param {Object} msg - Message object
 */
export const getSarcasticComment = (msg) => {
  try {
    const url = "https://sarcasm-api.herokuapp.com/";
    https.get(url, (res) => {
      res.on("data", (data) => {
        const comment = JSON.parse(data);
        const embed = new MessageEmbed()
          .setDescription(`**${comment.sarcasm}**`)
          .setColor(0x0949ee)
          .setTimestamp()
          .setFooter("Chandler Bing", "https://imgur.com/NobKgPg.jpg");
        msg.channel.send(embed);
      });
    });
  } catch (e) {
    console.log(e);
  }
}