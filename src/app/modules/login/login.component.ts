import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  messageOn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  async submit() {
    try {
      await this.userService.login(this.username, this.password);
      this.router.navigate(['app', 'home']);
    }
    catch (e) {
      this.messageOn = true;
    }
  }

  gotoRegister() {
    console.log('hello')
    this.router.navigate(['register']);
  }

}