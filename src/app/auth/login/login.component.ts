import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  theForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.theForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    //clear any previous error message first...
    this.errorMessage = null;

    const email = this.theForm.get('email').value;
    const password = this.theForm.get('password').value;

    this.authService.login(email, password)
    .catch((error: Error) => {
      this.errorMessage = error.message;
    });
  }

}
