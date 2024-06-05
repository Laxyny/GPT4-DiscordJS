const { Events, ActivityType, ActivityPlatform } = require('discord.js');
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

module.exports = {
    name: Events.ClientReady,
    async run(client) {
        // Synchronisation des commandes slash avec Discord
        await client.application.commands.set(client.commands.map(command => command.data));

        // Statuts
        const statuses = [
            () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
            () => `Version 1.0.0`,
        ];

        let i = 0;
        client.user.setPresence({ activities: [{ name: statuses[i](), type: ActivityType.Watching }], status: 'dnd' });

        setInterval(() => {
            client.user.setActivity(statuses[i](), { type: ActivityType.Watching });
            i = ++i % statuses.length;
        }, 10000); // Mise à jour toutes les 10 secondes

        console.log(`${client.user.tag} est en ligne et opérationnel`);
    }
};