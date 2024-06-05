const { Events, AttachmentBuilder, ChannelType, Formatters } = require('discord.js');
const { G4F } = require("g4f");

module.exports = {
    name: Events.MessageCreate,

    async run(client, interaction) {
        if (interaction.author.bot) return;
        if (interaction.channel.id !== "") return; //A changer

        //Ajouter un système qui détecte si le message commence par & puis un espace
        if (!interaction.content.startsWith("& ")) return;

        const prompt = interaction.content;
        const g4f = new G4F();
        const messages = [{ role: "user", content: prompt }];

        //Voir quand le bot écris son message
        interaction.channel.sendTyping();

        try {
            const text = await g4f.chatCompletion(messages);

            if (text.length > 2000) {
                const attachment = new AttachmentBuilder(Buffer.from(text, 'utf-8'), { name: "chat_ai.txt" });
                interaction.reply({ content: "Le message est trop long, le voici en fichier texte :", files: [attachment], ephemeral: false });
            } else {
                interaction.reply({ content: text, ephemeral: false });
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Une erreur est survenue lors de la génération de la réponse.", ephemeral: false });
        }
    }
};