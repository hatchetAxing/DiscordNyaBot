const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.data.name, command);
}

// TODO: implement cat fight, two users go against each other like cock fight bot?
// maybe also a neko atsume like game?
// each cat has stats, pics embedded with each too?

client.once('ready', () => {
	console.log('Ready!');
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {

	const keywords = ['kitten', 'kitty', 'cat', 'meow', 'penis', 'uwu'];
	// could add nya to keywords, but i have to do an author check

	let foundInText = false;
	for (const i in keywords) {
		if (message.content.toLowerCase().includes(keywords[i].toLowerCase())) foundInText = true;
	}
	if (foundInText) {
		message.channel.send('Nya~!');
	}
});

client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error('error');
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(token);