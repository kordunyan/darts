import {Player} from './player';

export class Group {
  public players: Player[] = [];

  constructor(public id: number) {
  }

  isEmpty() {
    return this.players.length === 0;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  playersCount() {
    return this.players.length;
  }
}
