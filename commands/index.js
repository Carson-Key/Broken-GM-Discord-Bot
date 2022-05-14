const { join } = require('./join.js');
const { leave } = require('./leave.js');
const { howOldAmI } = require('./howOldAmI.js');

const commands = {
    join: join,
    leave: leave,
    howoldami: howOldAmI
};

exports.commands = commands;