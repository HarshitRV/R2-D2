const { MessageEmbed } = require("discord.js");
const https = require("https");

/**
 * @description - Gets a random meme.
 * @param {Object} msg - Message object
 */
module.exports.showMeme = (msg) => {
    try {
        const url = "https://meme-api.herokuapp.com/gimme";
        https.get(url, (res) => {
            res.on("data", (data) => {
                const meme = JSON.parse(data);
              
                const embed = new MessageEmbed()
                    .setDescription(`[Meme Link](${meme.postLink})`)
                    .setAuthor(meme.author)
                    .setColor(0x0949ee)
                    .setImage(meme.url)
                    .setFooter("👍" + meme.ups)
                    .setTimestamp();
                msg.channel.send(embed);
            });
        });
    } catch (e) {
        console.log(e);
    }
}