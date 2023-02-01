/**
 * @file Message Based Commands Handler
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 3.3.0
 */

// Declares constants (destructured) to be used in this file.

const { EmbedBuilder } = require("discord.js");
const { openai_token, openai_org } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	organization: openai_org,
	apiKey: openai_token
});
const openai = new OpenAIApi(configuration);
const User = require("../schemas/user.js")

const context = [];
// Prefix regex, we will use to match in mention prefix.
module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Shriyansh Aggarwal
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

		// OpenAI stuff:
        const initPrompt = "A conversation between a rude, funny, sarcastic AI called Xenium and a person:\nXenium: Hello mortal.\n"
        const limit = 3;

		if(message.channel.id === "1067036810066276372" || message.channel.id === "1067409236142866482" || message.channel.id === "1068153515614154832"){
            if(message.author.bot) return;
            while(context.length >= limit){
                context.shift();
            }
            if(context.length <= limit){
                context.push(`${message.author.username}: ${message.content}`)
                let newPrompt = initPrompt + context.slice(-context.length).join("\n") + "\nXenium:";
                try {
				const gptResponse = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: newPrompt,
					temperature: 1,
					max_tokens: 200,
					stop: ["Xenium:", `${message.author.username}`]
				})
                message.reply(`${gptResponse.data.choices[0].text}`);
                context.push(`Xenium: ${gptResponse.data.choices[0].text}`);
			    } catch(err) {
				console.log(err)
			    }
            }
		}

		if(message.author.bot) return;

		// MongoDB stuff:

		/**
		 * @type {EmbedBuilder}
		 * @description Message Embed
		 */
		const firstMessageEmbed = new EmbedBuilder()
			.setColor("#00FF37")
			.setTitle(`Achievement unlocked!`)
			.setDescription("You just received an achievement!")
			.setImage("https://media.discordapp.net/attachments/1038439697577431141/1069637995499626617/Achievement_Unlocked.png?width=1440&height=304");

		if(message.content.length > 800){
			firstMessageEmbed.addFields(
				{
					name: "The Journey Begins",
					value: `Achievement Description:\n_Send a message for the first time in Xenolith._\nMessage Content: _Message length too large to display!_`
				}
			);
		} else {
			firstMessageEmbed.addFields(
				{
					name: "The Journey Begins",
					value: `Achievement Description:\n_Send a message for the first time in Xenolith._\nMessage Content: \`${message.content}\``
				}
			);
		}

		let userProfile = await User.findOne({ userId: message.author.id})
		if (!userProfile){
			userProfile = await new User({
				userId: message.author.id,
				username: message.author.username
			});

			userProfile.achievements[0].state.setState = true;

			await userProfile.save().catch(console.error);
			message.author.send({embeds: [firstMessageEmbed]}).catch(console.error);
		} else if(userProfile.achievements[0].state.setState === false){
            userProfile.achievements[0].state.setState = true;
            userProfile.save().catch(console.error);
            message.author.send({embeds: [firstMessageEmbed]}).catch(console.error);
        }
	},
};
