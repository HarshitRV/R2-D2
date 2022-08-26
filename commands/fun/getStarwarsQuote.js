import { MessageEmbed } from "discord.js";
import starwars from "starwars";

/**
 * @description - Starwars command.
 * @param {Object} msg - Message object
 */
export const getStarwarsQuote = (msg) => {
    try {
        const embed = new MessageEmbed()
        .setColor(0x0949ee)
        .setDescription(starwars())
        .setTimestamp();
        
        msg.channel.send(embed);
    } catch (e) {
        console.log(e);
    }
}