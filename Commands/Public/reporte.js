const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, ChatInputCommandInteraction} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reporte')
    .setDescription('Reporta a un usuario.')
    .addUserOption((options) => options.setName(`usuario`).setDescription(`Usuario a reportar`).setRequired(true))
    .addStringOption((options) => options.setName(`razon`).setDescription(`Razon del reportar`).setRequired(true)),
    /** 
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){

        const reportado = interaction.options.getUser(`usuario`);
        const razon = interaction.options.getString(`razon`);
        const channel = interaction.guild.channels.cache.get(`1149943598272483338`);

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`reporteban_${reportado.id}`)
            .setLabel(`Ban`)
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId(`reportekick_${reportado.id}`)
            .setLabel(`Kick`)
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId(`reportetimeout_${reportado.id}`)
            .setLabel(`Timeout (15m)`)
            .setStyle(ButtonStyle.Danger),
        )

            const embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.username} ha realizado un reporte`})
            .setTitle(`${reportado.tag} ha sido reportado`)
            .addFields({name: `Razon del reporte`, value: razon})
            .setFooter({text: `Elige una de las siguientes opciones para aplicar sobre el reportado`})

            await channel.send({embeds: [embed], components: [button]})
            await interaction.reply({content: `Tu reporte hacia ${reportado.username} ha sido enviado con éxito.`, ephemeral:true})


    },
};