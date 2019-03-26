export function markDataStatus(quests, userQuests){
    if(!quests)
        return;
    quests.forEach(item => {
        if (userQuests && userQuests.game_passed && userQuests.game_passed.filter(arr => arr.eid === item.eid).length)
            Object.assign(item, {mark: 'passed'});
        else if(userQuests && userQuests.game_process && userQuests.game_process.filter(arr => arr.eid === item.eid).length)
            Object.assign(item, {mark: 'process'});
        else
            Object.assign(item, {mark: 'none'});
    });
}
