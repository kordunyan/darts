import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/validators/user-name.validator';
import { passwordValidator } from 'src/app/shared/validators/password.valiator';

@Component({
  selector: 'app-reactiva',
  templateUrl: './reactiva.component.html',
  styleUrls: ['./reactiva.component.css']
})
export class ReactivaComponent implements OnInit {

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Alex'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  registrationForm = this.fb.group({
    userName: ['Alex', [Validators.required, Validators.minLength(4), forbiddenNameValidator(/addd/)]],
    password: [''],
    confirmPassword: [''],
    email: [''],
    subscribe: [false],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']  
    }),
    alternateEmails: this.fb.array([])
  }, {
    validators: passwordValidator
  });

  constructor(private fb: FormBuilder) { 

  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  ngOnInit() {
  }

  ladData() {
    this.registrationForm.patchValue({
      userName: 'Alex',
      password: '12345',
      confirmPassword: '12345'
    });
  }

}
