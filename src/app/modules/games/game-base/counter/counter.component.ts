import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() score ;
  @Input() defaultValue = 0;
  @Input() maxValue;

  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if (!this.score) {
      this.score = this.defaultValue;
    }
  }

  substract() {
    if (this.score > 0) {
      this.score--;
      this.change.emit(this.score);
    }
  }

  add() {
    if (this.maxValue && this.score >= this.maxValue) {
      return;
    }
    this.score++;
    this.change.emit(this.score);
  }

}
