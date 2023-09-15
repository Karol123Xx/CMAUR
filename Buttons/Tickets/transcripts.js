const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ActionRowBuilder,
    ChannelType,
    PermissionsFlagBits
} = require("discord.js") 

const transcripts = require("discord-html-transcripts")

module.exports = {
    data: {
        name: `transcripts`,
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction, client) {

        if(!interaction.member.roles.cache.has("1104814104704729210")) return interaction.reply({ content: `No tienes permisos para usar este botón.`, ephemeral:true})

        const channel = interaction.channel

        const attachment = await transcripts.createTranscript(channel)

        interaction.reply({files: [attachment]})
    },
};