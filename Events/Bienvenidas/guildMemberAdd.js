const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction, AttachmentBuilder, userMention } = require('discord.js');

const Canvas = require("canvas");
const { registerFont } = require("canvas");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member) {

        registerFont("RobotoSlab-Bold.ttf", { family: "Roboto Slab" })

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext("2d");

            let fontsize = 80;

            do {
                ctx.font = `${fontsize -= 10}px Roboto Slab`;
            } while (ctx.measureText(text).width > canvas.width - 300);
            return ctx.font
        }

        const canvas = Canvas.createCanvas(1028, 468);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("./bienvenidas.jpg");

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, `Bienvenido/a ${member.user.username}`);

        ctx.fillText(`Bienvenido/a ${member.user.username}`, 514, 360);

        ctx.beginPath();
        ctx.arc(514, 161, 124, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 1024, extension: "png" }))

        ctx.drawImage(avatar, 388, 35, 250, 250);

        const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
            name: "bienvenidas.png"
        })


        const channel = member.guild.channels.cache.get("990361726132306021")

        channel.send({ content: `Bienvenido ${member} a ${member.guild.name}.`, files: [attachment] })
    }
}
