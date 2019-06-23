import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/domain/player';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private playersService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.players = this.playersService.getKillerPlayers();
  }

  onPlayersSelected(players: Player[]) {
    this.playersService.saveKillerPlayers(players);
    this.router.navigate(['killer/targets']);
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
