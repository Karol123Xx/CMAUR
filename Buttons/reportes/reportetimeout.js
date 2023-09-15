const { PermissionFlagsBits } = require("discord.js")


module.exports = {
    data: {
        name: `reportetimeout`,
    },
    async execute(interaction, client, args) {
        const reportado = args[0];

        const razon = "Usuario Reportado";

        const hpmer = interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)

        if(!hpmer) return interaction.reply({content: `No tienes permisos suficientes para utilizar este boton`, ephemerald:true});

        const member = await interaction.guild.members.fetch(reportado).catch(console.error)

        if(reportado === interaction.user.id) return interaction.reply({content: `No puedes darte timeout a ti mismo`, ephemerald:true})

        if (reportado === client.user.id) return interaction.reply({content: `No puedes darme timeout a mi`, ephemerald:true})

        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: `No puedes dar timeout a alguien con un rol igual o mayor al tuyo`, ephemerald:true});

        if(!member.bannable) return interaction.reply({content: `No puedo dar timeout a este usuario`, ephemerald:true})

        await member.timeout(900000, razon).catch(console.error)


        await interaction.reply({content: `Se le ha dado timeout a <@${reportado}> exitosamente`})


    },
};