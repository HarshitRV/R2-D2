import { MessageEmbed } from "discord.js";

/**
 * @description - Displays users avatar.
 * @param {Object} msg - Message object
 */
export const showAvatar = (msg) => {
    try {
        const avatar = msg.author.displayAvatarURL();
        const embed = new MessageEmbed()
          .setTitle(msg.author.username)
          .setImage(avatar)
          .setColor(0x0949ee);

        msg.channel.send(embed);
    } catch (e) {
        console.log(e);
    }
}