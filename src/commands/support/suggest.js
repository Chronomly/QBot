//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class SuggestCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      group: 'support',
      memberName: 'suggest',
      description: 'Suggests something to the developers',
      details: oneLine `
        Do you like QuoteBot?
        Do you wish that your idea was a part of it?
        Suggest your idea to the developers!
			`,
      examples: ['suggest something cool lol'],
      args: [{
        key: 'toSug',
        label: 'suggestion',
        prompt: 'What would you like to suggest?',
        type: 'string',
        infinite: false
      }],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message, args) {
    //eslint-disable-next-line no-unused-vars
    const invite = message.channel.createInvite({
        temporary: false,
        maxAge: 0,
        maxUses: 1
      })
      .then(invite => {
        const embed = new RichEmbed()
          .setTitle(':bangbang: **New suggestion** :bangbang:')
          .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
          .setColor(0x0000FF)
          .setDescription(`**Guild:** ${message.guild.name} (${message.guild.id}) \n**Channel:** #${message.channel.name} (${message.channel.id}) \n**User:** ${message.author.tag} (${message.author.id}) \n**Suggestion:** ${args.toSug} \n**Invite:** ${invite}`)
          .setFooter('QBot Suggestions System')
          .setTimestamp()
        this.client.channels.get('304727510619389964').send({
          embed: embed
        });
      })
    message.reply('Thank you for your suggestion! The SmoreSoftware development team appreciates all feedback. We will get back to you soon if we like your idea and want to discuss specifics.');
  }
};
