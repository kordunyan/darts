import { Player } from '../domain/player';
import { ArrayUtils } from '../shared/utils/array.utils';
import { Subject } from 'rxjs';

export class AbstractGame {

    currentPlayerIdx: number;
    winEvent = new Subject<Player>();

    constructor(
        public players: Player[]
    ) {
        this.setCurrentPlayer();
    }

    onWin() {
        return this.winEvent;
    }

    setCurrentPlayer() {
        if (ArrayUtils.isEmpty(this.players)) {
            return;
        }
        this.currentPlayerIdx = this.players.findIndex(player => player.current);
        if (this.currentPlayerIdx < 0) {
            this.players[0].current = true;
            this.currentPlayerIdx = 0;
        }
    }

    hasLost(idx): boolean {
        return this.players[idx].lost;
    }

    skip() {
        this.players[this.currentPlayerIdx].overSet++;
        this.nextPlayer(true);
    }

    nextPlayer(skip = false) {
        const currentPlayer = this.players[this.currentPlayerIdx]; 
        if (!skip && !currentPlayer.lost) {
            if (currentPlayer.overSet > 0) {
                currentPlayer.overSet--;
                return;
            }
        }
        currentPlayer.current = false;
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
        player.overSet = 0;
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

    checkForWinner() {
        const winner = this.getWinner();
        if (winner) {
            this.winEvent.next(winner);
        }
    }

    getWinner(): Player {
        return null;
    }
}