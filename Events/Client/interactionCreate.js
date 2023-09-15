const {Client, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction} = require('discord.js');
const config = require('../../config.json');
const cooldown = new Set();

module.exports = {
    name:'interactionCreate',
    once:false,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client){
        if(!interaction.guild || !interaction.channel) return;
        if(interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);
        const cooldowns = await command.Cooldown;

        if(command){
            if(!command) return interaction.reply({content:`Comando no válido`, ephemeral:true})
            if(command.Cooldown && cooldown.has(interaction.user.id)) return interaction.reply({content:`Este comando tiene un tiempo de espera. Tienes que esperar 5 segundos para volver a usarlo`, ephemerald:true})
            cooldown.add(interaction.user.id);
        try {
            setTimeout(() => {
                cooldown.delete(interaction.user.id)
            }, cooldowns);
            command.execute(interaction, client);
        } catch (error) {
            return interaction.reply({ content: `Ocurrio un error al tratar de realizar este comando, por favor reportalo en un ticket de soporte.`, ephemerald:true})
        }
        }
    } else if (interaction.isButton()) {
       
        const buttonId = interaction.customId.split("_");
        const button = client.buttons.get(buttonId[0]);
        if(!button) return;
        button.execute(interaction, client, buttonId.slice(1))

        
    } else {
        return;
    }
   },
};