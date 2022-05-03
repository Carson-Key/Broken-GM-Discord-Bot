require("dotenv").config();
const { commands } = require('./commands/index.js');

const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const COMMAND_PREFIX = process.env.COMMAND_PREFIX
const DISCORD_TOKEN = process.env.DISCORD_TOKEN

client.on("messageCreate", async (message) => {
    if (!message.guildId || message.author.bot) {
        return
    } else if (message.content.startsWith(COMMAND_PREFIX)) {
        const command = message.content.slice(COMMAND_PREFIX.length).split(" ");
        const commandLowerCase = command[0].toLowerCase()
        if (commands[commandLowerCase]) {
            commands[commandLowerCase](message)
        }
    }
});

client.on('ready', () => {
    console.log("Ready");
});

client.login(DISCORD_TOKEN);