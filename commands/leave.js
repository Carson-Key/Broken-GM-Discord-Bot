const leave = async (message) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        console.log("Not in a Voice Channel")
        return message.channel.send("BrokenGM is not in a Voice Channel")
    } else {
        console.log("Left " + voiceChannel.name)
    }
};

exports.leave = leave;