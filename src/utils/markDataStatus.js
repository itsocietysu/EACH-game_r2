export function markDataStatus(quests, userQuests){
    if(!quests)
        return;
    quests.forEach(item => {
        if(userQuests && userQuests.games_process && item.eid in userQuests.games_process)
            Object.assign(item, {mark: 'process'});
        else if (userQuests && userQuests.game_passed && item.eid in userQuests.game_passed)
            Object.assign(item, {mark: 'passed'});
        else
            Object.assign(item, {mark: 'none'});
    });
}
