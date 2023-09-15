const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client, ChatInputCommandInteraction} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Ticket')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel(`Crear Ticket`)
            .setCustomId(`crearticket`)
            .setEmoji(`📩`)
            .setStyle(ButtonStyle.Success)
        )

        const embed = new EmbedBuilder()
        .setTitle(`🎫Servicio de tickets de CMAUR🎫`)
        .setDescription(`Utiliza de manera adecuada los tickets para evitar sanciones.`)
        .setImage("https://cdn.discordapp.com/attachments/1149966507820978256/1152042025345097838/Sin_titulo_2.png");

        await interaction.channel.send({embeds: [embed], components: [button]})
        await interaction.reply({content: `El mensaje de tickets se envió correctamente`, 
        ephemeral:true 
    });


    },
};