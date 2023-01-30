/**
 * @file Updated member file
 * @author Shriyansh Aggarwal
 * @since 1.0.0
 * @version 3.2.2
 */

module.exports = {
	name: "guildMemberUpdate",

	/**
	 * @description Executes when client detects a member updating info in the server.
	 * @param {import('discord.js').GuildMember & import('../typings').Client}
	 */


	async execute(oldMember, newMember) {
        let userProfile = await User.findOneAndUpdate(
			{ 
				userId: oldMember.id
			},
			{
				userId: newMember.id,
                username: newMember.username
			},
			{
				new: true,
				runValidators: true
			}
		)
		if(!userProfile){
			userProfile = await new User({
                userId: member.id,
                username: member.username
            });

            await userProfile.save().catch(console.error);
            console.log(userProfile);
		}
    }
};
