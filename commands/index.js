const { join } = require('./join.js');
const { leave } = require('./leave.js');

const commands = {
    join: join,
    leave: leave
};

exports.commands = commands;