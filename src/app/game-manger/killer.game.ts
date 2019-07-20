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
        this.checkForWinner();
    }

    getWinner(): Player {
        const currentPlayers = this.players.filter(player => !player.lost);
        if (currentPlayers.length === 1) {
            return currentPlayers[0];
        }
        return null;
    }


    buildNewGameData() {
        return new KillerGameData();
    }
}