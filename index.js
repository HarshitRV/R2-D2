const {Client , MessageEmbed} = require("discord.js");
const client = new Client();
const token = 'ODA1MzM5NzgyNjI0MzEzMzg0.YBZdHg.DEb-ZqS4VYhC2YVqLo_BfcON__0'
var starwars = require('starwars');

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
        .setDescription(starwars());
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
        const embed = new MessageEmbed()
        .setTitle(member)
        .setColor(0x0949EE)
        .setImage(msg.author.displayAvatarURL())
        msg.channel.send(embed);
    }

});


client.login(token);