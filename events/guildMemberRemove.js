/**
 * @file Gone member file
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 3.2.2
 */

const User = require("../schemas/user.js")

module.exports = {
	name: "guildMemberRemove",

	/**
	 * @description Executes when client detects a member leaving the server.
	 * @param {import('discord.js').GuildMember & import('../typings').Client} member The member of the server.
	 */


	async execute(member) {
        await User.findOneAndRemove({ userId: member.id})
        .catch(err => {
            console.log(err)
        });
    }
};
