const { readdirSync } = require('fs');

module.exports = client => {

    let count = 0;
    const dirsEvents = readdirSync("./events/");

    for(const dirs of dirsEvents) {
        const filesDirs = readdirSync(`./events/${dirs}/`).filter(file => file.endsWith('.js'));
        for (const files of filesDirs) {
            const event = require(`../events/${dirs}/${files}`);
            client.on(event.name, (...args) => event.run(client, ...args));
            //console.log(`Event chargé: ${event.name}`)
            count++
        }
    }

    console.log(`${count} events chargés`)
}