/**
 * @file Sample help command with slash command.
 * @author Shriyansh Aggarwal & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const User = require("../../../schemas/user.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("achievements")
		.setDescription(
			"List all achievements you have acquired in the server."
		),

	async execute(interaction) {

		// Database:
        let userProfile = await User.findOne({ userId: interaction.user.id})
        if(!userProfile){
            await interaction.reply("Your achievements database hasn't been setup yet. Send a normal message in the server first and then run this command again!")
        } else if(userProfile.achievements){

            const countTrueStates = obj => {
                let count = 0;
                for(let i = 0; i < obj.length; i++){
                    if(obj[i].state === true){
                        count++;
                    }
                }
                return count;
            }

            const countAchievements = countTrueStates(userProfile.achievements);

            const achievements = [];

            /**
             * @type {EmbedBuilder}
             * @description Help command's embed
             */

            for(let i = 0; i < countAchievements; i++){
                achievements.push({
                    name: "<:checkmark:1070332457397800980>  " + userProfile.achievements[i].name,
                    value: userProfile.achievements[i].desc
                })
            }

            const achievementsEmbed = new EmbedBuilder()
            .setColor("#2f3136")
            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
            .setTitle(`${interaction.user.username}'s Achievements:`)
            .setDescription(`This is your personal achievements page! You have unlocked ${countAchievements}/${userProfile.achievements.length} achievements.`);

            if(achievements.length === 0){
                achievementsEmbed.addFields({name: 'You have no Achievements unlocked! What a loser :(', value: "Looks like there's nothing here."});
                await interaction.reply({embeds: [achievementsEmbed]})
            } else {
                achievementsEmbed.addFields(achievements)
                await interaction.reply({embeds: [achievementsEmbed]})
            }
        }
	},
};
