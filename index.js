const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

//mongose user: karlitosxd31 C: IHu74kAZ8inWlfRl

const config = require('./config.json');

const { handleErrors } = require('./Functions/antiCrash');
const { loadButtons } = require('./Functions/buttonHandler');
const { loadEvents } = require('./Functions/loadEvents');
const { loadCommands } = require('./Functions/loadCommands');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});


client.commands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.setMaxListeners(0);

client.login(config.token).then(async () => {
    handleErrors(client)
    await loadEvents(client);
    await loadCommands(client);
    await loadButtons(client);
}).catch((err) => {
    console.log(err);
});