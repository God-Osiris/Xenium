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
		.setName("add")
		.setDescription(
			"Manually add an achievement"
		)
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("The specific User ID to add an achievement to.")
                .setRequired(true)
		).addIntegerOption((option) =>
            option
                .setName("index")
                .setDescription("The index number of the achievement you want to add.")
                .setRequired(true)
        ),

	async execute(interaction) {
		if(interaction.user.id === "689386468635836436"){
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let userID = interaction.options.get("id").value;
        let index = interaction.options.get("index").value;

        let userProfile = await User.findOne({ userId: userID})
		if (!userProfile){
			await interaction.reply("User database not found!")
		} else if(userProfile.achievements[index].state === false){
            let query = { userId: userID, "achievements.name": `${userProfile.achievements[index].name}` };
            let update = { $set: { "achievements.$.state": true } };
            let options = {};
            User.updateOne(query, update, options, function (err, data) {
            if (err) return handleError(err);
            });
            await interaction.reply("Added")
        } else if(userProfile.achievements[index].state === true){
            await interaction.reply("User already has this achievement!");
        }
		} else {
            await interaction.reply("U cannot use this command!")
        }
	},
};
