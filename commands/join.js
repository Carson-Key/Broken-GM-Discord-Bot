const { entersState, joinVoiceChannel, EndBehaviorType, VoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require("fs");
const { pipeline } = require('node:stream');
const prism = require('prism-media');
const child = require('child_process');

const pythonPath = __dirname + "/../bin/speech_to_text.py"

function createListeningStream(receiver, userId, textChannel, client) {
    const path = __dirname + "/../recordings/" + Date.now() + "-" + userId + ".ogg";
    
    const opusStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 100,
        },
    });
    const oggStream = new prism.opus.OggLogicalBitstream({
        opusHead: new prism.opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        opusTags: new prism.opus.OpusTags({
            maxPackets: 10,
        }),
    });
    const out = fs.createWriteStream(path);

    pipeline(opusStream, oggStream, out, (err) => {
        if (err) {
            console.warn("Error recording file " + path + ": " + err.message);
        } else {
            console.log("Recorded " + path);
            let py = child.spawn('python3', [
                pythonPath,
                path
            ]);
            py.stdout.on('data', (data) => {
                client.channels.cache
                    .get(textChannel.channelId)
                    .send("<@" + userId + ">" + " " + data.toString());
            });
        }
    });
}

const join = async (client, message) => {
    const voiceChannel = message.member.voice.channel;
    const textChannel = message;

    if (!voiceChannel) {
        console.log("You are not in a voice channel")
        return message.channel.send("Please join a voice channel first!")
    } else {
        console.log("Joined " + voiceChannel.name)
        connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            selfDeaf: false,
            selfMute: true,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
            const receiver = connection.receiver;
    
            receiver.speaking.on('start', (userId) => {
                console.log(message.member.user.username + " Started Speaking")
                createListeningStream(receiver, userId, textChannel, client)
            });
        } catch (error) {
            console.log(error);
        }
    }

};

exports.join = join;