import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  theForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 
    this.theForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.pattern('^.{6,}$')]),
        'password2': new FormControl(null, [Validators.required, this.matchesPassword.bind(this)])
    });
  }

  onSubmit() {
    const email = this.theForm.get('email').value;
    const password = this.theForm.get('password').value;

    this.authService.signup(email, password)
      .then(result => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        alert(error.message);
      })
  }

  matchesPassword(control: FormControl): { [s:string]: boolean } {
    if (this.theForm && this.theForm.get('password').value != control.value) {
      return { 'confirm password does not match password': true };
    } else {
      return null;
    }
  }
}
