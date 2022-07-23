const { MessageEmbed } = require("discord.js");
const https = require("https");

/**
 * @description - Get a random kanye quote.
 * @param {Object} msg - Message object
 */
module.exports.getRandomKanyeQuote = (msg) => {
    try {
        const url = "https://api.kanye.rest/";
        https.get(url, (res) => {
            res.on("data", (data) => {
                const dataReceived = JSON.parse(data);
                const kanye_says = dataReceived.quote;

                const embed = new MessageEmbed()
                    .setDescription(`${kanye_says}`)
                    .setColor(0x0949ee)
                    .setTimestamp()
                    .setFooter("Kanye West", "https://i.imgur.com/MXh6ZQu.jpg");
                msg.channel.send(embed);
            });
        });
    } catch (e) {
        console.log(e);
    }
} 