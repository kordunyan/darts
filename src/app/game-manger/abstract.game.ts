import { Player } from '../domain/player';
import { ArrayUtils } from '../shared/utils/array.utils';

export class AbstractGame {

    currentPlayerIdx: number;

    constructor(
        public players: Player[]
    ) {
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

    hasLost(idx): boolean {
        return this.players[idx].lost;
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

    previousPlayer() {
        this.players[this.currentPlayerIdx].current = false;
        this.previousIdx();
        while(this.hasLost(this.currentPlayerIdx)) {
            this.previousIdx();
        }
        this.players[this.currentPlayerIdx].current = true;
    }

    previousIdx() {
        this.currentPlayerIdx--;
        if (this.currentPlayerIdx < 0) {
            this.currentPlayerIdx = this.players.length - 1;
        }
    }

    setPlayers(players: Player[]) {
        this.players = players;
        this.changedPlayerScore();
        this.setCurrentPlayer();
    }
    
    changedPlayerScore() {

    }

    initPlayers() {
        if (ArrayUtils.isNotEmpty(this.players)) {
            this.players.forEach(player => this.initPlayer(player));
        }
    }

    initPlayer(player: Player): Player {
        player.lost = false;
        player.current = false;
        player.gameData = this.buildNewGameData();
        return player;
    }

    buildNewGameData() {
        return undefined;
    }

    addUniquePlayer(player: Player): boolean {
        if (this.playerExists(player.name)) {
            return false;
        }
        this.players.push(this.initPlayer(player));
        return true;
    }

    playerExists(playerName) {
        const nameInLowerCase = playerName.toLowerCase();
        return this.players.findIndex(p => p.name.toLowerCase() === nameInLowerCase) > -1;
    }

    getPlayerNames(): string[] {
        return this.players.map(player => player.name);
    }

    deletePlayer(playerToRemove: Player) {
        this.players = this.players.filter(player => player.name !== playerToRemove.name);    
    }
}