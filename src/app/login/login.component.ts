import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: string;
  validation: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.SignUpAdmin(email, password);
  }
  signIn(email, password) {
    this.authService.login(email, password);
  }
  onLoginSubmit() {

    if (!this.email || !this.password) {
      this.validation = 'Les champs email et mot de passe sont obligatoires';
    } else {
      this.authService.login(this.email,this.password);
    }
  }

}
