var spawn = {
    spawn: function(spawn){
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if(harvesters.length < 2) {
            var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
    }
};

module.exports = spawn;