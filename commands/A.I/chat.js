const { SlashCommandBuilder, PermissionFlagsBits, MessageAttachment, AttachmentBuilder } = require('discord.js');
const { G4F } = require("g4f");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Posez une question à un modèle IA')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("Votre prompt")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async run(interaction) {
        const prompt = interaction.options.getString('prompt');

        const g4f = new G4F();
        const messages = [
            { role: "user", content: prompt }
        ];

        const text = await g4f.chatCompletion(messages).catch(error => {
            console.error(error);
        });

        interaction.reply({ content: text, ephemeral: false })
    }
};
