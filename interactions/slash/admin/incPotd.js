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
		.setName("incpotd")
		.setDescription(
			"Manually add 1 to the count of POTD wins."
		)
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("The specific User ID to add the count to.")
                .setRequired(true)
		),

	async execute(interaction) {
        if(interaction.user.id === "689386468635836436"){
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let userID = interaction.options.get("id").value;
        let userProfile = await User.findOne({ userId: userID})
		if (!userProfile){
			await interaction.reply("User database not found!")
		} else if(userProfile.achievements[2].state === false){
            let query = { userId: userID, "achievements.name": "Puzzle Aficionado" };
            let update = { $set: { "achievements.$.state": true } };
            let options = {};
            User.updateOne(query, update, options, function (err, data) {
            if (err) return handleError(err);
            });
            await interaction.reply("Added the achievement, now run this command again!")
        } else if(userProfile.achievements[2].state === true){
            let count = userProfile.achievements[2].count;
            let query = { userId: userID, "achievements.name": "Puzzle Aficionado" };
            let update = { $set: { "achievements.$.count": count + 1 } };
            let options = {};
            User.updateOne(query, update, options, function (err, data) {
            if (err) return handleError(err);
            });
            await interaction.reply("User already has this achievement, so added +1 count.");
        }
        } else {
            await interaction.reply("U cannot use this command!")
        }
	},
};
