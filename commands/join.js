const { entersState, joinVoiceChannel, EndBehaviorType, VoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require("fs");
const { pipeline } = require('node:stream');
const prism = require('prism-media');

function createListeningStream(receiver, userId) {
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

    const filename = `./recordings/${Date.now()}.ogg`;

    const out = fs.createWriteStream(filename);

    pipeline(opusStream, oggStream, out, (err) => {
        if (err) {
            console.warn(`❌ Error recording file ${filename} - ${err.message}`);
        } else {
            console.log(`✅ Recorded ${filename}`);
        }
    });
}

const join = async (client, message) => {
    const voiceChannel = message.member.voice.channel;
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
                console.log(userId)
                createListeningStream(receiver, userId)
            });
        } catch (error) {
            console.log(error);
        }
    }

};

exports.join = join;