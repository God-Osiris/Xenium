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

const context = [];
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
        const initPrompt = "A conversation between a rude, sassy discord AI called Xenium and humans:\nXenium: Hello mortal.\n"

		if(message.channel.id === "1067036810066276372" || message.channel.id === "1067409236142866482"){
            if(message.author.bot) return;
            if(context.length >= 3){
                context.shift();
                context.shift();
            } if(context.length <= 3){ context.push(`${message.author.username}: ${message.content}`)
                let newPrompt = initPrompt + context.slice(-context.length).join("\n") + "\nXenium:";
                try {
				const gptResponse = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: newPrompt,
					temperature: 1,
					max_tokens: 150,
					stop: ["Xenium:", `${message.author.username}`]
				})
                message.reply(`${gptResponse.data.choices[0].text}`);
                context.push(`Xenium: ${gptResponse.data.choices[0].text}`);
			    } catch(err) {
				console.log(err)
			    }
            }
		}
	},
};
