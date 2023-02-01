/**
 * @file Main encryption command.
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const xmorse = require('xmorse');
const atbash = require('../../../algorithms/atbash.js')
const railFence = require('../../../algorithms/railfence.js')
const str2bin = require("str2bin")
const User = require("../../../schemas/user.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */

module.exports = {
    // The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
    .setName("encrypt")
    .setDescription(
        "Converts regular text into ciphertext using the provided arguments."
    )
    .addStringOption((option) =>
        option
            .setName("cipher")
            .setDescription("The cipher you want to use for encryption.")
            .setRequired(true)
            .addChoices({
                name: "Base64",
                value: "enc_base64"
            }, {
                name: "Morse Code",
                value: "enc_morse"
            }, {
                name: "Atbash Cipher",
                value: "enc_atbash"
            }, {
                name: "Binary Conversion",
                value: "enc_binary"
            }, {
                name: "Railfence Cipher",
        value: "enc_railf"
            })
    )
    .addStringOption((option) =>
        option
            .setName("text")
            .setDescription("The text you want to encrypt")
            .setRequired(true)
    ),

    async execute(interaction) {
        /**
		 * @type {string}
		 * @description The "command" argument
		 */
		let cipher = interaction.options.getString("cipher");
        const clearText = interaction.options.get("text").value;

        if(cipher === "enc_base64"){
            const result = Buffer.from(clearText, 'utf8').toString('base64');
            await interaction.reply({
                content: `\`${result}\``
            })
	    } else if(cipher === "enc_morse"){
            const result = xmorse.encode(clearText);
            await interaction.reply({
                content: `\`${result}\``
            })
        } else if(cipher === "enc_atbash"){
            const result = atbash.atbash(clearText);
            await interaction.reply({
                content: `\`${result}\``
            })
        } else if(cipher === "enc_binary"){
            const result = str2bin.strToBin(clearText);
            await interaction.reply({
                content: `\`${result}\``
            })
        } else if(cipher === "enc_railf"){
            const result = railFence.railFence(clearText, 3, "encrypt");
            await interaction.reply({
                content: `\`${result}\``
            })
        }

        /**
         * @type {EmbedBuilder}
         * @description Help command's embed
         */
        
        const firstEncryptEmbed = new EmbedBuilder()
			.setColor("#00FF37")
			.setTitle(`Achievement unlocked!`)
			.setDescription("You just received an achievement!")
            .addFields({
                name: "Newborn Cryptographer",
                value: `Achievement Description:\n_Use \`/encrypt\` for the first time._`
            })
			.setImage("https://media.discordapp.net/attachments/1038439697577431141/1069637995499626617/Achievement_Unlocked.png?width=1440&height=304");

        let userProfile = await User.findOne({ userId: interaction.user.id})
		if (!userProfile){
			userProfile = await new User({
				userId: interaction.user.id,
				username: interaction.user.username
			});

			userProfile.achievements[1].state.setState = true;

			await userProfile.save().catch(console.error);
			await interaction.user.send({embeds: [firstEncryptEmbed]}).catch(console.error);
		} else if(userProfile.achievements[1].state.setState === false){
            userProfile.achievements[1].setState = true;
            userProfile.save().catch(console.error);
            await interaction.user.send({embeds: [firstEncryptEmbed]}).catch(console.error);
        }
    }
};