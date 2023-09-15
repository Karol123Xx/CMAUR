const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("encuesta")
      .setDescription("Crear una encuesta")
      .addStringOption((option) =>
        option
          .setName("pregunta")
          .setDescription("Pregunta de la encuesta")
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("chanel")
          .setDescription("Canal de la encuesta")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("opciones")
          .setDescription("Opciones de la encuesta, separadas por comas")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        
      const pregunta = interaction.options.getString("pregunta");
      const chanel = interaction.options.getChannel("chanel");
      const opciones = interaction.options.getString("opciones").split(",");
  
      if (opciones.length < 2) {
        return interaction.reply("Debes proporcionar al menos 2 opciones.");
      }
     const { guild } = interaction;
  
  
        
      const canal = interaction.guild.channels.cache.get(`${chanel}`); //en caso de que no quieran que se mande a un canal en especifico me mencionan y yo les dire lo que deben quitar
      
      const embed = new EmbedBuilder()
        .setAuthor({
          name: guild.name,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .setImage("https://cdn.discordapp.com/attachments/1147995189378547926/1149863691781681263/slp0510_IG.jpg") //Si quieren que se muestre el banner de su server, remplacen esta linea por .setImage(guild.bannerURL({ size: 1024 }))
        .setTitle("Nueva Encuesta")
        .setDescription(`>>> ${pregunta}`)
        .setColor("Blue")
        .setFooter({
          text: `Creada por ${interaction.user.tag}`,
          iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
        });
  
      for (let i = 0; i < opciones.length; i++) { 
        embed.addFields({ name: `Opción ${i + 1}`, value: `>>> ${opciones[i]}`, inline: true });
      }
  
      const sentMessage = await chanel.send({ content: `@everyone`, embeds: [embed], fetchReply: true,});
        await interaction.reply({content: `>>> **La encuesta se mando exitosamente a ${chanel}** `, ephemeral: true});
  
      for (let i = 0; i < opciones.length; i++) {
        await sentMessage.react(getEmojiFromNumber(i + 1));
      }
    },
  };
  
  function getEmojiFromNumber(number) {
    const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    return numbers[number - 1] || "❓";
  }