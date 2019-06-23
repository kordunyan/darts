import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-killer',
  templateUrl: './killer.component.html',
  styleUrls: ['./killer.component.css']
})
export class KillerComponent implements OnInit {

  score = 0;

  constructor() { }

  ngOnInit() {
  }

  minus() {
    this.score--;
  }

  plus() {
    this.score++;
  }

}
