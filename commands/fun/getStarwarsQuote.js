const { MessageEmbed } = require("discord.js");
const starwars = require("starwars");

/**
 * @description - Starwars command.
 * @param {Object} msg - Message object
 */
module.exports.getStarwarsQuote = (msg) => {
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