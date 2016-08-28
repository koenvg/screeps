var roomController = require('roomController');

module.exports.loop = function () {

    var spawns = Game.spawns;

    for(var key in spawns){
        var spawn = spawns[key];
        roomController.run(spawn);
    }
};