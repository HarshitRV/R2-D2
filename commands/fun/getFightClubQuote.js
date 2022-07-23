const { MessageEmbed } = require("discord.js");
const https = require("https");

/**
 * @description - Get a random fightclub quote.
 * @param {Object} msg - Message object
 */

module.exports.getFightClubQuote = (msg) => {
    try {
        const url = "https://fightclub-api.herokuapp.com/FightClub";

        https.get(url, (res) => {
            res.on("data", (data) => {
                const dataReceived = JSON.parse(data);
                let randomQuote = Math.trunc(Math.random() * dataReceived.length);
                const embed = new MessageEmbed()
                    .setDescription(`${dataReceived[randomQuote].quote}`)
                    .setColor(0x0949ee)
                    .setTimestamp();
                msg.channel.send(embed);
            });
        });
    } catch (e) {
        console.log(e);
    }
}