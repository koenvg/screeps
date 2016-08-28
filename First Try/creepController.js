var defaultCreepSettings = [
    {
        role: 'harvester',
        size: 1,
        buildPattern: [WORK,CARRY,MOVE],
        behavior: require('role.harvester')
    },
    {
        role: 'builder',
        size: 1,
        buildPattern: [WORK,CARRY,MOVE],
        behavior: require('role.builder')
    },
    {
        role: 'upgrader',
        size: 2,
        buildPattern: [WORK,CARRY,MOVE],
        behavior: require('role.upgrader')
    }
];

var creepController = {
    run: function(spawn){
        var room = spawn.room;
        defaultCreepSettings.forEach(function(creepSetting){
            var creepsInRoom = _.filter(Game.creeps, (creep) => creep.memory.role == creepSetting.role && creep.memory.room == room.name);
            // Spawning new units in case not all are there
            if(creepsInRoom.length < creepSetting.size){
                var newName = spawn.createCreep(creepSetting.buildPattern, undefined, {role: creepSetting.role, room: room.name});
                console.log('Spawning new ' + creepSetting.role + ': ' + newName);
            }

            // Running the creeps
            for(var index in creepsInRoom){
                var creep = creepsInRoom[index];
                var behaviour = getbehaviour(creep.memory.role);
                behaviour.run(creep);
            }
        });
    }
};

function getbehaviour(role){
    for(var index in defaultCreepSettings){
        var creepSetting = defaultCreepSettings[index];
        if(creepSetting.role === role){
            return creepSetting.behavior;
        }
    }
}

module.exports = creepController;