const { ActivityType } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`connected as ${client.user.tag}`);

    // Set bot activity
    client.user.setActivity("Bot en desarrollo, reporta errores en un ticket.", {
      type: ActivityType.Custom,
    });

    mongoose.set('strictQuery', true);
        await mongoose.connect(config.DatabaseURL, {
            keepAlive:true,
        }).then(() => {
            console.log('[MONGODB] Está conectado correctamente'.green);
        }).catch((err) => {
            console.log(`No se pudo conectar a la base de datos ${err}`.red);
        });

  },
};