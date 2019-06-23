import { Player } from '../domain/player';

export class KillerGame {

    currentPlayerIdx: number;

    constructor(
        public maxHits: number,
        public players: Player[]
    ) {
        this.changedPlayerScore();
        this.setCurrentPlayer();
    }

    setPlayers(players: Player[]) {
        this.players = players;
        this.changedPlayerScore();
        this.setCurrentPlayer();
    }

    setCurrentPlayer() {
        this.currentPlayerIdx = this.players.findIndex(player => player.current);
        if (this.currentPlayerIdx < 0) {
            this.players[0].current = true;
            this.currentPlayerIdx = 0;
        }
    }

    nextPlayer() {
        this.players[this.currentPlayerIdx].current = false;
        this.nextIdx();
        while (this.hasLost(this.currentPlayerIdx)) {
            this.nextIdx();
        }
        this.players[this.currentPlayerIdx].current = true;
    }

    nextIdx() {
        this.currentPlayerIdx++;
        if (this.currentPlayerIdx >= this.players.length) {
            this.currentPlayerIdx = 0;
        }
    }

    previousIdx() {
        this.currentPlayerIdx--;
        if (this.currentPlayerIdx < 0) {
            this.currentPlayerIdx = this.players.length - 1;
        }
    }

    previousPlayer() {
        this.players[this.currentPlayerIdx].current = false;
        this.previousIdx();
        while(this.hasLost(this.currentPlayerIdx)) {
            this.previousIdx();
        }
        this.players[this.currentPlayerIdx].current = true;
    }

    hasLost(idx): boolean {
        return this.players[idx].lost;
    }

    changedPlayerScore() {
        this.players.forEach(player => {
            player.lost = player.gameData.hitsNumber >= this.maxHits; 
        });
    }

}