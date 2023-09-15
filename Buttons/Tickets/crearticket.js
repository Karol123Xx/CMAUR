const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ActionRowBuilder,
    ChannelType
} = require("discord.js") 


module.exports = {
    data: {
        name: `crearticket`,
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction, client) {

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel(`Transcripts`)
            .setCustomId(`transcripts`)
            .setEmoji(`📄`)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel(`Lock`)
            .setCustomId(`lock_${interaction.user.id}`)
            .setEmoji(`🔒`)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel(`Unlock`)
            .setCustomId(`unlock_${interaction.user.id}`)
            .setEmoji(`🔓`)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel(`Cerrar Ticket`)
            .setCustomId(`cerrarticket_${interaction.user.id}`)
            .setEmoji(`🚫`)
            .setStyle(ButtonStyle.Danger)
        );

        const embed = new EmbedBuilder()
        .setTitle(`Hola ${interaction.user.username} bienvenido a tu ticket.`)
        .setDescription(`Por favor espera a que un staff te atienda.`)

        const channel = await interaction.guild.channels.create({
            name: `ticket ${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: `990370180112736266`
        })

        await channel.permissionOverwrites.create(channel.guild.roles.everyone, {
            ViewChannel: false,
            SendMessages: false
    })

        await channel.permissionOverwrites.create(interaction.user.id, {
            ViewChannel: true,
            SendMessages: true
    })

    const staff = interaction.guild.roles.cache.get("1081057380894244975")    

    await channel.permissionOverwrites.create(staff, {
        ViewChannel: true,
        SendMessages: true
})

    await channel.send({ embeds: [embed], components: [buttons] })
    await interaction.reply({content: `Tu ticket fue creado en <#${channel.id}>`, ephemeral:true})

        
    },
};