/**
 * @file Updated member file
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 3.2.2
 */

const User = require("../schemas/user.js")

module.exports = {
	name: "guildMemberUpdate",

	/**
	 * @description Executes when client detects a member updating info in the server.
	 * @param {import('discord.js').GuildMember & import('../typings').Client}
	 */


	async execute(oldMember, newMember) {
        let userProfile = await User.findOne({ userId: oldMember.id})
		if (!userProfile){
			userProfile = await new User({
				userId: newMember.id,
				username: newMember.displayName,
			});

			await userProfile.save().catch(console.error);
		} else if(userProfile.username === oldMember.displayName){
			userProfile.username = newMember.displayName;
			await userProfile.save().catch(console.error);
		}
    }
};
