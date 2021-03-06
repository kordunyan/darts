import { Injectable } from '@angular/core';
import { AbstractStorageService } from './abstract-storage.service';
import { Player } from 'src/app/domain/player';
import { max } from 'rxjs/operators';

const KEY_VALUES = {
  NAMES: 'NAMES',
  KILLER_PLAYERS: 'KILLER_PLAYERS',
  MAX_HITS: 'MAX_HITS'
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends AbstractStorageService {

  constructor() {
    super();
  }

  saveKillerPlayers(players: Player[]) {
    this.updateObjectItem(KEY_VALUES.KILLER_PLAYERS, players);
  }

  getKillerPlayers(): Player[] {
    const result = this.getObjectItem(KEY_VALUES.KILLER_PLAYERS);
    if (result) {
      return result;
    }
    return []; 
  }

  getMaxHits(): number {
    return this.getItem(KEY_VALUES.MAX_HITS);
  }

  saveMaxHits(maxHits: number) {
    this.updateItem(KEY_VALUES.MAX_HITS, maxHits);
  }

  saveNewNames(names: string[]) {
    const existedNames = this.getAllNames();
    const newNames = [];
    
    names.forEach(name => {
      const nameLowerCase = name.toLowerCase();
      const idx = existedNames.findIndex(n => n.toLowerCase() === nameLowerCase);
      if (idx < 0) {
        newNames.push(name);  
      }
    });

    if (!newNames.length) {
      return;
    }
    this.saveNames(existedNames.concat(newNames));
  }

  saveNames(names: string[]) {
    this.updateObjectItem(KEY_VALUES.NAMES, names);
  }

  getAllNames(): string[] {
    const result = this.getObjectItem(KEY_VALUES.NAMES); 
    if (result) {
      return result;
    }
    return [];
  }

}
