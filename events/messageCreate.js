/**
 * @file Message Based Commands Handler
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection, ChannelType } = require("discord.js");
const { openai_token, openai_org } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	organization: openai_org,
	apiKey: openai_token
});

const openai = new OpenAIApi(configuration);

// Prefix regex, we will use to match in mention prefix.
module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message The message which was created.
	 */

	async execute(message) {
		// Declares const to be used.

		const { client, guild, channel, content, author } = message;

		// Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
		// You can change the behavior as per your liking at ./messages/onMention.js

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		if(message.channel.id === "1067036810066276372" && !message.author.bot){
			console.log('w')
			try {
				const gptResponse = await openai.createCompletion({
					model: "davinci",
					prompt: `Xenium is a very sassy and humorous chatbot with a bit of dark humour.\n\
					Xenium: Hello! Do you puny mortals need some assistance today?\n\
					${message.author.username}: ${message.content}\n\
					Xenium:`,
					temperature: 0.5,
					max_tokens: 125,
					stop: ["Xenium:", `${message.author.username}`]
				})

				message.reply(`${gptResponse.data.choices[0].text}`)
				return;
			} catch(err) {
				console.log(err)
			}
		}
	},
};
