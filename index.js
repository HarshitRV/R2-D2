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
import { randomPhilsosophy, philsosophy } from "./commands/fun/philsosophy.js";

// Client events.
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  try {
    if (!msg.guild) return;

    const commandPrefix = msg.content.split("")[0];
    //! Should be removed from depoloyed version --------------------
    const args = msg.content.slice(prefix.length).trim().split(" ");
    console.log(commandPrefix, prefix);
    console.log(msg.content, args);
    //! -------------------------------------------------------------

   
    if (commandPrefix !== prefix) return;
    console.log("Command detected");

    switch (`${args[0].toLowerCase()}`) {
      // Help commands
      case `help`: help(msg, prefix); break;
      case `music`: musicHelp(msg, prefix); break;
      case `filter-list`: filterHelp(msg, prefix); break;

      // Fun commands
      case `ping`: msg.channel.send(`Pong! ${client.ws.ping}ms`); break;
      case `starwars`: getStarwarsQuote(msg); break;
      case `av`: showAvatar(msg); break;
      case `meme`: showMeme(msg); break;
      case `kanye`: getRandomKanyeQuote(msg); break;

      // Exclusive commands
      case `sarcasm`: getSarcasticComment(msg); break;
      case `phil`: randomPhilsosophy(msg, philsosophy); break;
      case `fightclub`: getFightClubQuote(msg); break;
      case `r2d2`: openAI(msg, args); break;

      // Print commands
      case `print`: print(msg, args); break;
      default: break;
    }

  } catch (e) {
    console.log(e);
  }
});

keepAlive();
client.login(process.env.TOKEN);