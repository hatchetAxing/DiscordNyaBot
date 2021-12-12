const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responds with Nya!'),
	async execute(interaction) {
		return interaction.reply('Nya!');
	},

};