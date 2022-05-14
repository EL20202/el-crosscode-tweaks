/*
 * command module - intended for mod devs, not the user.
 * these commands are more intended for to simplify things when using the console.
 * they can vary from just "shortcuts", to possibly other things.
 * i discourage using them in code, though i guess nothing's stopping you...
*/
window.cmd = {
    addItem: (id: number, amount: number = 1, hideMsg: boolean) => {
        if(sc.inventory.getItem(id)){
            sc.model.player.addItem(id, amount, hideMsg)
        } else {
            console.warn(`Item ${id} does not exist!`)
        }
    },
    addCredits: (amount: number) => sc.model.player.addCredit(amount),
    teleport: (mapName: string, destination: ig.TeleportPosition) => ig.game.teleport(mapName, destination),
    /*
     * will reload all player configs to reflect any changes
     * for example, if you're tweaking an art, you don't need to reload the game
     * every time you make one little change.
     */
    reloadPlayerConfigs() {
        Object.entries(sc.party.models).forEach(([key, value]) => {
            value.config.debugReload = true;
            value.config.reload();
            if(key === sc.model.player.name) {
                sc.model.player.setConfig(new sc.PlayerConfig(sc.model.player.name))
            }
        })
    },
    reloadEffectSheets: () => Object.values(ig.EffectSheet.cache).forEach(sheet => sheet.reload())
}