const join = async (message) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        console.log("You are not in a voice channel")
        return message.channel.send("Please join a voice channel first!")
    } else {
        console.log("Joined " + voiceChannel.name)
    }

};

exports.join = join;