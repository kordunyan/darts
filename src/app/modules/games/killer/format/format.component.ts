import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  topics = ['Angular', 'React', 'Vue'];

  userModel = new User('Sasha', "alex@.com", 5555553465, 'Vue', 'morning', true);

  topicHasErrpr = true;

  constructor() { }

  ngOnInit() {
  }

  validateTopic(value) {
    this.topicHasErrpr = value === 'default'; 
  }

  onSubmit(userForm) {
    console.log(userForm);
  }

}
