require("dotenv").config();

/**
 * Node module dependencies
 */
const { Client } = require("discord.js");

/**
 * Bot client
 */
const client = new Client();

/**
 * Bot prefix
 */
const prefix = ".";

/**
 * Express server to keep the bot alive
 */
const keepAlive = require("./server")

/**
 * Commands imports.
 */
// Help commands.
const { 
  help,
  musicHelp,
  filterHelp 
} = require("./commands/core/help");

// Fun commands.
const { getStarwarsQuote } = require("./commands/fun/getStarwarsQuote");
const { showAvatar } = require("./commands/fun/showAvatar");
const { showMeme } = require("./commands/fun/showMeme");
const { print } = require("./commands/fun/print");

// Exclusive commands.
const { getSarcasticComment } = require("./commands/fun/getSarcasticComment");
const { getRandomKanyeQuote } = require("./commands/fun/getRandomKanyeQuote");
const { getFightClubQuote } = require("./commands/fun/getFightClubQuote");
const { openAI } = require("./commands/openAI/openaiCommand");
const randomPhilsosophy = require("./commands/fun/philsosophy");

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