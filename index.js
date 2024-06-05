require('dotenv/config')
const { Discord, EmbedBuilder, MessageActionRow, MessageButton, GatewayIntentBits, Client, Collection, IntentsBitField, PermissionFlagsBits } = require('discord.js');
const client = new Client({ intents: new IntentsBitField(3276799) });

const loadCommands = require('./loaders/loadCommands.js');
const loadEvents = require('./loaders/loadEvents.js');
const loadInteractions = require('./loaders/loadInteractions.js');

client.commands = new Collection();
client.interactions = new Collection();

(async () => {
    loadCommands(client);
    loadEvents(client);
    loadInteractions(client);
    client.login(process.env.TOKEN);
})();