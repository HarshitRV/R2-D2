/**
 * Node module dependencies
 */
import { Client } from "discord.js";

/**
 * Bot client
 */
const client = new Client();

/**
 * Bot prefix
 */
const prefix = process.env.PREFIX;

/**
 * Express server to keep the bot alive
 */
import { keepAlive } from "./server.js";

/**
 * Commands imports.
 */
// Help commands.
import { 
  help,
  musicHelp,
  filterHelp 
} from "./commands/core/help.js";

// Fun commands.
import { getStarwarsQuote } from "./commands/fun/getStarwarsQuote.js";
import { showAvatar } from "./commands/fun/showAvatar.js";
import { showMeme } from "./commands/fun/showMeme.js";
import { print } from "./commands/fun/print.js";

// Exclusive commands.
import { getSarcasticComment } from "./commands/fun/getSarcasticComment.js";
import { getRandomKanyeQuote }from "./commands/fun/getRandomKanyeQuote.js";
import { getFightClubQuote } from "./commands/fun/getFightClubQuote.js";
import { openAI } from "./commands/openAI/openaiCommand.js";
import { randomPhilsosophy } from "./commands/fun/philsosophy.js";

// Client events.
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  try {
    if (!msg.guild) return;
    const args = msg.content.slice(prefix.length).trim().split(" ");

    switch (`${prefix}${args[0].toLowerCase()}`) {
      // Help commands
      case `${prefix}help`: help(msg, prefix); break;
      case `${prefix}music`: musicHelp(msg, prefix); break;
      case `${prefix}filter-list`: filterHelp(msg, prefix); break;

      // Fun commands
      case `${prefix}ping`: msg.channel.send(`Pong! ${client.ws.ping}ms`); break;
      case `${prefix}starwars`: getStarwarsQuote(msg); break;
      case `${prefix}av`: showAvatar(msg); break;
      case `${prefix}meme`: showMeme(msg); break;
      case `${prefix}kanye`: getRandomKanyeQuote(msg); break;

      // Exclusive commands
      case `${prefix}sarcasm`: getSarcasticComment(msg); break;
      case `${prefix}philosophy`: randomPhilsosophy(msg); break;
      case `${prefix}fightclub`: getFightClubQuote(msg); break;
      case `${prefix}r2d2`: openAI(msg, args); break;

      // Print commands
      case `${prefix}print`: print(msg, args); break;
      default: break;
    }

  } catch (e) {
    console.log(e);
  }
});

keepAlive();
client.login(process.env.TOKEN);