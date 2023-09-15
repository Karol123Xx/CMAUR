const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Elimina mensajes de un canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option.setName('cantidad').setDescription('Cantidad de mensajes a eliminar').setRequired(true),
    )
    .addUserOption((option) =>
      option.setName('usuario').setDescription('Eliminar mensajes de un usuario especifico').setRequired(false),
    ),
  async execute(interaction) {
    const { channel, options } = interaction;

    const amount = options.getInteger('cantidad');
    const target = options.getUser('usuario');

    const messages = await channel.messages.fetch({
      limit: amount + 1,
    });

    const res = new EmbedBuilder().setColor('Orange');

    if (target) {
      let i = 0;
      const filtered = [];

      (await messages).filter((msg) => {
        if (msg.author.id === target.id && amount > i) {
          filtered.push(msg);
          i++;
        }
      });

      await channel.bulkDelete(filtered).then((messages) => {
        res.setDescription(
          `✅ Se Han Eliminado Con Exito ${messages.size} Mensajes De ${target}`,
        );
        interaction.reply({ embeds: [res] });
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        res.setDescription(`✅ Se Han Eliminado Con Exito ${messages.size} Mensajes Del Chat`);
        interaction.reply({ embeds: [res] });
      });
    }
  },
};
