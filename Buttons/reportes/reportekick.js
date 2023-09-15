const { PermissionFlagsBits } = require("discord.js")


module.exports = {
    data: {
        name: `reportekick`,
    },
    async execute(interaction, client, args) {
        const reportado = args[0];

        const razon = "Usuario Reportado";

        const hpmer = interaction.member.permissions.has(PermissionFlagsBits.KickMembers)

        if(!hpmer) return interaction.reply({content: `No tienes permisos suficientes para utilizar este boton`, ephemerald:true});

        const member = await interaction.guild.members.fetch(reportado).catch(console.error)

        if(reportado === interaction.user.id) return interaction.reply({content: `No puedes kickearte a ti mismo`, ephemerald:true})

        if (reportado === client.user.id) return interaction.reply({content: `No puedes kickearme a mi`, ephemerald:true})

        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: `No puedes kickear a alguien con un rol igual o mayor al tuyo`, ephemerald:true});

        if(!member.bannable) return interaction.reply({content: `No puedo kickear a este usuario`, ephemerald:true})

        await member.kick(razon).catch(console.error)


        await interaction.reply({content: `<@${reportado}> ha sido kickeado exitosamente`})


    },
};