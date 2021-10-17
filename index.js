require('dotenv').config()
const {
  Client,
  MessageEmbed
} = require("discord.js");
const client = new Client();
const starwars = require('starwars');
const https = require("https");
// const keepAlive = require("./server")
const prefix = ">"

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (!msg.guild) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  //RANDOM STAR WARS QUOTE
  if (msg.content === `${prefix}quote`) {
    const embed = new MessageEmbed()
      .setColor(0x0949EE)
      .setDescription(starwars())
      .setTimestamp()
    msg.channel.send(embed);
  }
  //PING COMMANDS
  if (msg.content === `${prefix}ping`) {
    msg.channel.send(`Pong! ${client.ws.ping}ms`)
  }
  //MODERATION COMMANDS
  //kick
  if (msg.content.startsWith(`${prefix}kick`)) {
    const user = msg.mentions.users.first();

    if (user) {
      const member = msg.guild.member(user);

      if (member) {
        member
          .kick()
          .then(() => {
            msg.reply(`Kicked ${user.tag}`);
          })
          .catch(err => {
            msg.reply('Unable to kick the member');
            console.error(err)
          });
      } else {
        msg.reply(`User is not in the guild!`);
      }
    } else {
      msg.reply("You didn't mention the user!")
    }
  }

  //ban
  if (msg.content.startsWith(`${prefix}ban`)) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);

      if (member) {
        member
          .ban()
          .then(() => {
            msg.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {

            msg.reply('I was unable to ban the member');

            console.error(err);
          });
      } else {
        msg.reply("That user isn't in this guild!");
      }
    } else {
      msg.reply("You didn't mention the user to ban!");
    }
  }

  //AVATAR
  if (msg.content === `${prefix}av`) {
    const avatar = msg.author.displayAvatarURL();
    const embed = new MessageEmbed()
      .setTitle(msg.author.username)
      .setImage(avatar)
      .setColor(0x0949EE)
    msg.channel.send(embed);
  }
  //MEME
  if (msg.content.startsWith(`${prefix}meme`)) {
    const url = "https://meme-api.herokuapp.com/gimme"
    https.get(url, (res) => {
      res.on("data", (data) => {
        const meme = JSON.parse(data)
        //console.log(meme)
        const embed = new MessageEmbed()
          .setDescription(`[Meme Link](${meme.postLink})`)
          .setAuthor(meme.author)
          .setColor(0x0949EE)
          .setImage(meme.url)
          .setFooter('👍' + meme.ups)
          .setTimestamp()
        msg.channel.send(embed);
      })
    })
  }
  //joke
  if (msg.content.startsWith(`${prefix}joke`)) {
    const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    https.get(url, (res) => {
      res.on("data", (data) => {
        const joke = JSON.parse(data)
        //console.log(joke);
        const embed = new MessageEmbed()
          .setDescription(`**${joke.setup}**\n\n${joke.delivery}`)
          .setColor(0x0949EE)
          .setTimestamp()
          .setFooter('Requested by ' + msg.author.username, msg.author.displayAvatarURL())
        msg.channel.send(embed);
      })
    })
  }
  //CHANDLER BING SARCASTIC COMMENTS
  if (msg.content.startsWith(`${prefix}sarcasm`)) {
    const url = "https://sarcasm-api.herokuapp.com/sarcasm";
    https.get(url, (res) => {
      res.on("data", (data) => {
        const sarcasm = JSON.parse(data)
        const sno = sarcasm.length;
        const random = Math.floor(sno * Math.random());
        const sarcasticComment = sarcasm[random].sarcasm;

        const embed = new MessageEmbed()
          .setDescription(`**${sarcasticComment}**`)
          .setColor(0x0949EE)
          .setTimestamp()
          .setFooter("Chandler Bing", "https://imgur.com/NobKgPg.jpg")
        msg.channel.send(embed);
      });
    })
  }
  //Kanye quotes
  if (msg.content.startsWith(`${prefix}kanye`)) {
    const url = "https://api.kanye.rest/"
    https.get(url, res => {
      res.on("data", data => {
        const dataReceived = JSON.parse(data)
        const kanye_says = dataReceived.quote

        const embed = new MessageEmbed()
          .setDescription(`**Kanye Says**`)
          .setColor(0x0949EE)
          .setTimestamp()
          .setFooter("Chandler Bing", "https://imgur.com/NobKgPg.jpg")
        msg.channel.send(embed);
      })
    })
  }
  //Print message
  if (msg.content.startsWith(`${prefix}print`)) {
    //  prefix =  args[0];
    console.log(args);
    // prefix = args[0]
    args.shift();
    to_send = args.join(" ")
    msg.channel.send(to_send)
  }
  //General HELP
  if (msg.content.startsWith(`${prefix}help`)) {
    const embed = new MessageEmbed()
      .setAuthor("R2-D2™|Help", "https://i.imgur.com/7Mb8CAT.png")
      .setTitle("Hey there 👋. Help has arrived")
      .setDescription(`**Prefix:**  \`${prefix}\`\n\n**Fun Commands**`)
      .addFields(
        {name: `🎶 ${prefix}music`, value:`Opens the music panel to play music`},
        {name: `❛❜ ${prefix}quote`, value:`Generates random starwars quote`},
        {name: `😹 ${prefix}meme`, value:`Generates random meme`},
        {name: `😏 ${prefix}sarcasm`, value:`Get random Chandler Bing quotes`},
        {name: `🤣 ${prefix}joke`, value:`Generates random joke`},
        {name: `\u200b`, value:`**Mod Commands**`},
        {name: `📡 ${prefix}ping`, value:`Pings the bot`},
        {name: `🥾 ${prefix}kick`, value:`Kicks the mentioned user`},
        {name: `⛔️ ${prefix}ban`, value:`Bans the mentioned user`},
        {name: `👨‍🏫 ${prefix}av`, value:`Shows your avatar`},
        {name: `\u200b`, value:`**[Invite Me ](https://discord.com/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot)**`, inline:true},
        {name: `\u200b`, value:`**[Vote Me 😘 ](https://top.gg/bot/854977056022331423/vote)**`,inline:true},
        {name: `\u200b`, value:`**[GitHub](https://github.com/HarshitRV/R2-D2)**`,inline:true},
      )
      .setColor(0x0949EE)
      .setTimestamp()
      .setFooter("Dev | WOLVERINE911#3940", "https://i.imgur.com/I6lsh5r.jpg")
    msg.channel.send(embed);
  }
   //Music HELP
   if (msg.content.startsWith(`${prefix}music`)) {
    const embed = new MessageEmbed()
      .setAuthor("R2-D2™|Music Panel", "https://i.imgur.com/7Mb8CAT.png")
      .setTitle("Get in the groove 🎵 🎵")
      .setDescription(`**Prefix:**  \`${prefix}\`\n\n**Music Commands**`)
      .addFields(
        {name: `▶️ ${prefix}play (optional search)`, value:`Adds the song to the queue and plays it if the queue is empty`},
        {name: `⏮ ${prefix}back`, value:`Plays the previous track`},
        {name: `🆑 ${prefix}clear`, value:`Clears the current queue`},
        {name: `🎼 ${prefix}filter (name of filter)`, value:`Applies filter on music. For filter list use ${prefix}filter-list`},
        {name: `🔁 ${prefix}loop`, value:`Plays current track in loop`},
        {name: `🎧 ${prefix}np`, value:`Shows currently played song(s)`},
        {name: `⏸ ${prefix}pause`, value:`Pauses the song`},
        {name: `▶️ ${prefix}resume`, value:`Resumes the song`},
        {name: `― ${prefix}progress`, value:`Shows progress of current song`},
        {name: `𝍂 ${prefix}queue`, value:`Shows current queue`},
        {name: `💽 ${prefix}save`, value:`Saves the song`},
        {name: `🔎 ${prefix}search`, value:`Searches the mentioned song. Select serial number to play the song`},
        {name: `🔀 ${prefix}shuffle`, value:`Shuffle play the songs`},
        {name: `⏭ ${prefix}skip`, value:`Skips to next song in queue`},
        {name: `🔕 ${prefix}stop`, value:`Disconnects from voice channel`},
        {name: `🔊 ${prefix}volume`, value:`Set the volume of the bot`},
        {name: `\u200b`, value:`**[Invite Me](https://discord.com/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot)**`, inline:true},
        {name: `\u200b`, value:`**[Vote Me 😘](https://top.gg/bot/854977056022331423/vote)**`,inline:true},
        {name: `\u200b`, value:`**Credits:** **[ZerioDev](https://github.com/ZerioDev)**`, inline:true},
      )
      .setColor(0x0949EE)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL())
    msg.channel.send(embed);
  }
  if (msg.content.startsWith(`${prefix}filter-list`)) {
    const embed = new MessageEmbed()
      .setAuthor("R2-D2™|Filter", "https://i.imgur.com/7Mb8CAT.png")
      .setTitle("Apply these awesome filters.🎵 🎵")
      .setDescription(`**Note:** Longer the song, longer it will take to apply the filter`)
      .addField(
        "Filters", "bassboost_low | bassboost | bassboost_high | 8D | vaporwave | nightcore | phaser | tremolo | vibrato | reverse | treble | normalizer | normalizer2 | surrounding | pulsator | subboost | karaoke | flanger | gate | haas | mcompand | mono | mstlr | mstrr | compressor | expander | softlimiter | chorus | chorus2d | chorus3d | fadein | dim | earrape", true
      )
      .addFields(
        {name: `\u200b`, value:`**[Invite Me➕](https://discord.com/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot)**`},
        {name: `\u200b`, value:`**[Vote Me 😘](https://top.gg/bot/854977056022331423/vote)**`},
        {name: `\u200b`, value:`**Credits:** **[ZerioDev](https://github.com/ZerioDev)**`},
      )
      .setColor(0x0949EE)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL())
    msg.channel.send(embed);
  }
});

// keepAlive();
client.login(process.env.TOKEN);