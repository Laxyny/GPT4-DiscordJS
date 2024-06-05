const { readdirSync } = require('fs')

module.exports = client => {

    let count = 0;
    const dirsInteractions = readdirSync("./interactions/");

    for (const dirs of dirsInteractions) {
        const filesDirs = readdirSync(`./interactions/${dirs}/`).filter(file => file.endsWith('.js'));
        for (const files of filesDirs) {
            const interaction = require(`../interactions/${dirs}/${files}`);
            client.interactions.set(interaction.name, interaction);
            count++;
        }
    }
    console.log(`${count} interactions chargées`);
}