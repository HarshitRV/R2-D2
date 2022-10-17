import { MessageEmbed } from "discord.js";

export const philsosophy = [
    "Always look people in the eye even if they are blind, just say, 'I'm looking you in the eye.",
    "If you get pulled over for speeding tell the policeman your spouse has diarrhea.",
    "Never be afraid to reach the stars because even if you fall you'll always be wearing a parent chute. TM.",
    "Marry someone who looks sexy while disappointed.",
    "Older black ladies make best iced tea.",
    "Success is 1% inspiration, 98% perspiration and 2% attention to detail.",
    "You can tell a lot about a person from his biography.",
    "Watch a sunrise at least once a day.",
    "If you love something set it free, unless it's a tiger.",
    "If you're ever in jam, a crayon scrunched up under your nose makes a good pretend mustache.",
    "When life gives you lemonade, make lemons, life will be like what??!!!"
];

/**
 * 
 * @param {Array} philsosophy 
 * @returns {String} - A random Phil's philosophy
 */
export const randomPhilsosophy = (msg, arr) => {
    const philPhilosopy = arr[Math.trunc((Math.random() * arr.length))];

    const embed = new MessageEmbed()
        .setColor(0x0949ee)
        .setDescription(philPhilosopy)
        .setFooter("Phil Dunphy", "https://i.imgur.com/rhlSCoZ.jpeg")
        .setTimestamp();

    msg.channel.send(embed);
}