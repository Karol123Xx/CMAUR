const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const day = require("dayjs")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("mira informacion del servidor")
    .addSubcommand(subcommand =>
		subcommand
			.setName('info')
			.setDescription('Informacion del servidor')) 
            
            .addSubcommand(subcommand =>
                subcommand
                    .setName('icon')
                    .setDescription('mira el icono del servidor')),
    async execute(client, interaction){
        const { guild } = interaction;
        const icon = interaction.options.getSubcommand('icon')
        const info = interaction.options.getSubcommand('info')

    const owner = interaction.guild.fetchOwner()
    const createsv = day(interaction.guild.createdAt).format("DD/MM/YY")
    const user = interaction.options.getMember('user');
    let Author = interaction.user



    const subcommand = interaction.options.getSubcommand()

    if(subcommand === "info") {
    
    const embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name}`)
    .setThumbnail(interaction.guild.iconURL())
    .setColor("Purple")
    .setFooter({ text: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true})})
    .setTimestamp()
    .addFields(
        {name: "👑 Owner:", value: `${await interaction.guild.fetchOwner()}`, inline: true},
        {name: "🆔 ID del servidor:", value: `${interaction.guild.id}`, inline: true},
        {name: "📅 Fecha de creacion:", value: `${createsv}`, inline: true},
        {name: "💬 Numero de canales:", value: `${interaction.guild.channels.cache.size}`, inline: true},
        {name: "👥 Miembros:", value: `${interaction.guild.memberCount}`, inline: true},
        {name: "🔨 Roles existentes:", value: `${interaction.guild.roles.cache.size}`, inline: true},
        {name: "😀 Emojis:", value: `${interaction.guild.emojis.cache.size}`, inline: true},
        {name: "✨ Nivel de mejoras:", value: `${interaction.guild.premiumSubscriptionCount.toString()}`, inline: true},
        

    )
  interaction.reply({ embeds: [embed]});
    }
   const subcommand2 = interaction.options.getSubcommand()

   if(subcommand2 === "icon") {
   
  const embed2 = new EmbedBuilder()
  .setTitle(`icono de ${interaction.guild.name}`)
  .setImage(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
  .setColor("Purple")

  interaction.reply({ embeds: [embed2]})}
}
  

}