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
        name: `unlock`,
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction, client, args) {

        const user = args[0]

        if(!interaction.member.roles.cache.has("1104814104704729210")) return interaction.reply({ content: `No tienes permisos para usar este botón.`, ephemeral:true});

        await interaction.channel.permissionOverwrites.create(user, {
            ViewChannel:true,
            SendMessages:true
        })

        await interaction.reply({content: `Canal desbloqueado con éxito`, ephemeral:true})

    },
};