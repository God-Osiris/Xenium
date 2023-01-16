/**
 * @file Main encryption command.
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */

module.exports = {
    // The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
    .setName("decrypt")
    .setDescription(
        "Converts ciphertext into regular text using the provided arguments."
    )
    .addStringOption((option) =>
        option
            .setName("cipher")
            .setDescription("The cipher you want to use for decryption.")
            .setRequired(true)
            .addChoices({
                name: "Base64",
                value: "dec_base64"
            }, {
                name: "Morse Code",
                value: "dec_morse"
            })
    )
    .addStringOption((option) =>
        option
            .setName("text")
            .setDescription("The text you want to decrypt")
            .setRequired(true)
    ),

    async execute(interaction) {
        /**
		 * @type {string}
		 * @description The "command" argument
		 */
		let cipher = interaction.options.getString("cipher");
        const cipherText = interaction.options.get("text").value;

        if(cipher === "dec_base64"){
            const result = Buffer.from(cipherText, 'utf8').toString('base64');
            await interaction.reply({
                content: `\`${result}\``
            })
	    }
    }
};