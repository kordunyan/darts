import { Player } from '../domain/player';
import { AbstractGame } from './abstract.game';
import { KillerGameData } from '../domain/killer.game-data';

export class KillerGame extends AbstractGame {

    constructor(
        players: Player[],
        public maxHits: number
    ) {
        super(players);
    }

    changedPlayerScore() {
        this.players.forEach(player => {
            player.lost = player.gameData.hitsNumber >= this.maxHits; 
        });
    }

    buildNewGameData() {
        return new KillerGameData();
    }
}