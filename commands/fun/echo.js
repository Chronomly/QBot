const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class SuggestCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'echo',
      group: 'fun',
      memberName: 'echo',
      description: 'echos what you say!',
      details: oneLine `
        Wanna make the bot say something?
        Use this!
			`,
      examples: ['echo lol'],
      args: [{
        key: 'toEcho',
        label: 'echo',
        prompt: 'What would you like me to say?',
        type: 'string',
        infinite: false
      }],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message, args) {
    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
      .setColor(0x0000FF)
      .setDescription(`${args.toEcho}`)
      .setFooter(`Message echoed from: ${message.author.username}`)
      .setTimestamp()
    message.delete(1)
    await message.channel.send({
      embed
    })
  }
};