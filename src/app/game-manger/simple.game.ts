import { Player } from '../domain/player';
import { AbstractGame } from './abstract.game';

export class SimpleGame extends AbstractGame {

    constructor(players: Player[]) {
        super(players);
    }

}