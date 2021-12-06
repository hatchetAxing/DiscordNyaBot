require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// TODO: implement cat fight, two users go against each other like cock fight bot?
// maybe also a neko atsume like game?
// each cat has stats, pics embedded with each too?

client.once('ready', () => {
	console.log('Ready!');
	console.log('Logged in!');
});

client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Nya!');
	}

});

client.login(token);



