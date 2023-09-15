const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ActionRowBuilder,
    ChannelType,
    PermissionsFlagBits
} = require("discord.js") 

module.exports = {
    data: {
        name: `cerrarticket`,
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction, client, args) {

        await interaction.channel.delete();
    },
};