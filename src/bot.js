import * as Discord from 'discord.js';
import * as fs from 'fs';
const client = new Discord.Client({ autoReconnect: true });
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('pissbaby');
});

client.on('messageReactionAdd', (reaction, user) => {
	if (reaction.emoji.name == '⭐') {
		const msg = reaction.message;
		if (msg.embeds.length > 0) return;
		if (reaction.author == msg.author) return;
		const embed = new Discord.MessageEmbed()
			.setTitle('starboard')
			.setAuthor(msg.author.tag, msg.author.avatarURL())
			.setColor(0xcca300)
			.addField('Starred By', `${user.username}`, true)
			.addField('Channel', `${msg.channel}`, true)
			.addField('Message', `${msg.content}`, false)
			.setFooter(`⭐ ${client.user.username} Starboard ⭐`)
			.setTimestamp();
		msg.reply(embed);
	}
});

client.login(config.token);
