const { DiscordApiError } = require("discord.js");

/**
 * @description - Prints the message to the channel.
 * @param {Object} msg - Message object
 * @param {Array} args - Strings array with the command arguments
 */
module.exports.print = (msg, args) => {
    try {
       if(args.length === 1) {
           msg.channel.send("You need to provide a message to print.");
       } else {
            args.shift();
            to_send = args.join(" ");
            msg.channel.send(to_send);
       }
    } catch (e) {
        console.log(e);
    }
}
