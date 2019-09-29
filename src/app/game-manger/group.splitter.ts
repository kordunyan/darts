import {Player} from '../domain/player';
import {Injectable} from '@angular/core';
import {DARTS_TABLE} from '../domain/darts.table';
import {FormBuilder} from '@angular/forms';
import {ArrayUtils} from '../shared/utils/array.utils';
import {Group} from '../domain/group';

@Injectable({
  providedIn: 'root'
})
export class GroupSplitter {

  splitInGroups(players: Player[]) {
    const groups = this.buildGroups(players);
    if (ArrayUtils.isEmpty(groups)) {
      return;
    }
    groups.forEach(group => {
      group.players.forEach(player => {
        player.gameData.groupId = group.id;
      });
    });
  }

  buildGroups(players: Player[]): Group[] {
    const playersOnTable = this.placeOnTable(players);
    const groups: Group[] = [];
    let currentGroup = new Group(groups.length);
    let firstPlayer: Player;
    let idx = this.getFirstEmptyPosition(playersOnTable);
    // if idx < 0, it mean table is full of players
    if (idx < 0) {
      return;
    }

    while (!firstPlayer || firstPlayer !== playersOnTable[idx]) {
      const currentPlayer = playersOnTable[idx++];
      if (idx === DARTS_TABLE.COUNT_NUMBERS) {
        idx = 0;
      }
      if (currentPlayer) {
        if (!firstPlayer) {
          firstPlayer = currentPlayer;
        }
        currentGroup.addPlayer(currentPlayer);
      } else if (!currentGroup.isEmpty()) {
        if (currentGroup.playersCount() > 1) {
          groups.push(currentGroup);
        }
        currentGroup = new Group(groups.length);
      }
    }
    if (currentGroup.playersCount() > 1) {
      groups.push(currentGroup);
    }
    return groups;
  }

  getFirstEmptyPosition(playersOnTable: Player[]) {
    return playersOnTable.findIndex(v => v === undefined);
  }

  placeOnTable(players: Player[]) {
    const playersOnTable = new Array<Player>(DARTS_TABLE.COUNT_NUMBERS);
    players.forEach(player => {
      const target = player.gameData.target;
      playersOnTable[this.getTablePosition(target)] = player;
    });
    return playersOnTable;
  }

  getTablePosition(numberValue) {
    return DARTS_TABLE[numberValue];
  }

}

