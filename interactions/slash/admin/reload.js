/**
 * @file Sample help command with slash command.
 * @author Shriyansh Aggarwal & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require("discord.js");
const User = require("../../../schemas/user.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription(
			"Reload the User schema to update changes."
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
        if(interaction.user.id === "689386468635836436"){
            await interaction.reply("No reload specifications added.")
        } else {
            await interaction.reply("U cannot use this command!")
        }

        // const newAchievement = {
        //     name: "Puzzle Aficionado",
        //     state: false,
        //     desc: "Win a puzzle of the day event.",
        //     count: 0
        // };

        // User.updateMany({}, { $push: { achievements: newAchievement } }, (error, result) => {
        //     if (error) {
        //         console.error(error);
        //     } else {
        //         console.log("Updated succesfully!");
        //     }
        // });

	},
};
