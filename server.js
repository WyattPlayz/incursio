// Initalize Discord.js, The client, RichEmbed, And The Bot Prefix
const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client;
const prefix = process.env.PREFIX

// When the bot is ready,
client.on('ready', () => {
  // Do this.
  console.log('Bot boot successful.');
  client.user.setPresence({game: {name: 'People code!', type: 'WATCHING'}, status: 'online'});
});

//When someone sends a message
client.on('message', msg => {
  // Make sure they arent a bot
  if (msg.author.bot) return;
  // Log the message
  console.log(`Message From ${msg.author.username}/${msg.author.id} On Channel ${msg.channel.name} With Content: "${msg.content}"`);
  // Get the arguments and command
  var args = msg.content.slice(prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase()
  // Check for a command
  if (cmd == "help") {
    console.log(`Help command execution from ${msg.author.username}/${msg.author.id}`);
    var embed = new RichEmbed()
    .setTitle('Help:')
    .setColor(0x000000)
    .setFooter('Provided By Incursio Development')
    .setDescription('!say - Force the bot to say something');
    msg.channel.send(embed);
    return;   }
  else if (cmd == "say") {
    if (!msg.member.hasPermission(8192, false, true, true)) {
      var embed = new RichEmbed()
      .setTitle('Error')
      .setColor(0xFF0000)
      .setFooter('Provided By Incursio Development')
      .setDescription('You do not have permission to execute this command! MANAGE MESSAGES/8192 Required!');
      msg.channel.send(embed);
      return;
    }
    msg.delete();
    console.log(`Say command execution from ${msg.author.username}/${msg.author.id}`);
    msg.channel.send(args.join(" "));
    return;
  }
});

// When someone sends a message
client.on('message', msg => {
  // Initalize a array of swear words.
  var SWEARS = [ "fuck", "shit", "hell", "fucking", "fuckin", "shitty", "shity", "hel", "hell", "kill", "k1ll", "sh1t" ]
  // If the message contains one:
  if (msg.content.includes(SWEARS)) {
    // Stop it from sending.
    var embed = new RichEmbed()
    .setTitle('Oh Nos!')
    .setFooter('Swear Detection')
    .setDescription('You cannot say that word!')
    .setColor(0xFF0000);
    msg.channel.send(embed);
    msg.delete();
  }
});

/* client.on('messageDelete', msg => {
  const logs = msg.guild.channels.find(channel => channel.name === "mod-logs");
  var embed = new RichEmbed()
  .setTitle('Moderation Log')
  .setColor(0x000000)
  .setFooter('Provided By Incursio Development')
  .setDescription(`Message With Content ${msg.content} Sent By ${msg.author.username}`);
  logs.send(embed);
  return;
}); */

client.login(process.env.BT)
