const {Client , MessageEmbed} = require("discord.js");
const client = new Client();
const token = ''
const starwars = require('starwars');
const https = require("https");

client.on("ready" , ()=>{
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message',msg =>{
    if(!msg.guild) return;

    //PING COMMAND
    if(msg.content === '.ping'){
        msg.reply('Pong!');
    }

    //RANDOM STAR WARS QUOTE
    if(msg.content === '.quote'){
        const embed = new MessageEmbed()
        .setColor(0x0949EE)
        .setDescription(starwars())
        .setTimestamp()
        msg.channel.send(embed);
    }

    //MODERATION COMMANDS
    //kick
    if(msg.content.startsWith('.kick')){
        const user = msg.mentions.users.first();
        
        if(user){
            const member = msg.guild.member(user);

            if(member){
                member
                    .kick()
                    .then(()=>{
                        msg.reply(`Kicked ${user.tag}`);
                    })
                    .catch(err => {
                        msg.reply('Unable to kick the member');
                        console.error(err)
                    });
            }else{
                msg.reply(`User is not in the guild!`);
            }
        }else{
            msg.reply("You didn't mention the user!")
        }
    }

    //ban
    if (msg.content.startsWith('.ban')) {
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
    if (msg.content === '.av') {
        const avatar = msg.author.displayAvatarURL();
        const embed = new MessageEmbed()
        .setTitle(msg.author.username)
        .setImage(avatar)
        .setColor(0x0949EE)
        msg.channel.send(embed);
    }
    //MEME
    if(msg.content.startsWith(".meme")){
        const url = "https://meme-api.herokuapp.com/gimme"
        https.get(url , (res)=>{
          res.on("data",(data)=>{
            const meme = JSON.parse(data)
            //console.log(meme)
            const embed = new MessageEmbed()
            .setDescription(`[Meme Link](${meme.postLink})`)
            .setAuthor(meme.author)
            .setColor(0x0949EE)
            .setImage(meme.url)
            .setFooter('👍'+meme.ups)
            .setTimestamp()
            msg.channel.send(embed);
          })
        })
    }
    if(msg.content.startsWith(".joke")){
        const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
        https.get(url , (res)=>{
          res.on("data",(data)=>{
            const joke = JSON.parse(data)
            //console.log(joke);
            const embed = new MessageEmbed()
            .setDescription(`**${joke.setup}**\n\n${joke.delivery}`)
            .setColor(0x0949EE)
            .setTimestamp()
            .setFooter('Requested by '+msg.author.username , msg.author.displayAvatarURL())
            msg.channel.send(embed);
        })
      })
    }
    if(msg.content.startsWith(".help")){
        const embed = new MessageEmbed()
        .setAuthor("R2-D2™|Help" , "https://i.imgur.com/7Mb8CAT.png")
        .setTitle("Commands")
        .setDescription("**__Prefix__** : `.`\n\n**Fun Commands**\n\n`.quote    :`Generates random star wars quote\n`.meme     :`Generates random meme\n`.joke     :`Generates random jokes\n\n**Mod Commands**\n\n`.ping     :`Pings the bot\n`.kick     :`Kicks the mentioned user\n`.ban      :`Bans the mentioned user\n`.av       :`Shows your avatar\n\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=854977056022331423&permissions=8&scope=bot) | [GitHub](https://github.com/lucifer00911/R2-D2)")
        .setColor(0x0949EE)
        .setTimestamp()
        .setFooter("Dev | WOLVERINE911#3940","https://i.imgur.com/I6lsh5r.jpg")
        msg.channel.send(embed);
    }
});


client.login(token);