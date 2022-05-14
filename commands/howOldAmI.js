const { CommandInteractionOptionResolver } = require('discord.js');
const moment = require('moment');

const howOldAmI = async (client, message) => {
    const accountCreation = moment(message.member.user.createdAt)
    const now = moment(Date.now())
    const ageInMiliseconds = now.diff(accountCreation)
    const ageMomentObject = moment.duration(ageInMiliseconds)
    const ageData = ageMomentObject._data
    const age = 
        ageData.years.toString() + " years, " +
        ageData.months.toString() + " months, " +
        ageData.days.toString() + " days, " +
        ageData.hours.toString() + " hours, " +
        ageData.minutes.toString() + " minutes, and " +
        ageData.seconds.toString() + " seconds"

    client.channels.cache
        .get(message.channelId)
        .send("<@" + message.member.user.id + ">" + " You are: " + age + " old!");
};

exports.howOldAmI = howOldAmI;