const { readdirSync } = require('fs');

module.exports = client => {

    let count = 0;
    const dirsCommands = readdirSync("./commands/");

    for (const dirs of dirsCommands) {
        const filesDirs = readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'));
        for (const file of filesDirs) {
            const command = require(`../commands/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
            //console.log(`Commande chargée: ${command.data.name}`)
            count++
        }
    }
    console.log(`${count} commandes chargées`)

}