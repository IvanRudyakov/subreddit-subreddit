import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  messageOn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  async submit() {
    try {
      await this.userService.register(this.username, this.password);
      this.router.navigate(['app', 'home']);
    }
    catch (e) {
      this.messageOn = true;
    }
  }

}