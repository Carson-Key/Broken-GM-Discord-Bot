const moment = require('moment');
const { ageStringGenerater } = require('../helpers/howOldAmI');

const howOldAmI = async (client, message) => {
    const accountCreation = moment(message.member.user.createdAt)
    const now = moment(Date.now())
    const ageInMiliseconds = now.diff(accountCreation)
    const ageMomentObject = moment.duration(ageInMiliseconds)
    const ageData = ageMomentObject._data
    const age = ageStringGenerater(ageData)

    client.channels.cache
        .get(message.channelId)
        .send("<@" + message.member.user.id + ">" + " You are: " + age + " old!");
};

exports.howOldAmI = howOldAmI;