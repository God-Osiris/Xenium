/**
 * @file New member file
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 3.2.2
 */

const User = require("../schemas/user.js")

module.exports = {
	name: "guildMemberAdd",

	/**
	 * @description Executes when client detects a new member joining the server.
	 * @param {import('discord.js').GuildMember & import('../typings').Client} member The member of the server.
	 */


	async execute(member) {
        let userProfile = await User.findOne({ userId: member.id});
        if (!userProfile){
            userProfile = await new User({
                userId: member.id,
                username: member.displayName
            });

            await userProfile.save().catch(console.error);
        }
    }
};
