const { getVoiceConnection } = require('@discordjs/voice');

const leave = async (client, message) => {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) {
        console.log("Not in a Voice Channel")
        client.channels.cache
            .get(message.channelId)
            .send("BrokenGM is not in a Voice Channel");
    } else {
        console.log("Left!")
        connection.destroy()
    }
};

exports.leave = leave;