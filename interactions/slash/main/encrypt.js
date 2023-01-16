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
	    }
    }
};