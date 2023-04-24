import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  isLoading: boolean = true;
  ownProfile: User = {currentlyloggedIn: 'anonymous'};
  profile: User | null = null;
  isSelf: boolean = false;
  userId: string = '';
  
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('uid') as string;
    this.getUser();
  }

  async getUser() {
    this.isLoading = true;
    this.isSelf = false;
    this.ownProfile = {currentlyloggedIn: 'anonymous'}
    this.ownProfile = await this.userService.get_me();
    this.profile = await this.userService.get_user(this.userId);
    if (this.ownProfile.currentlyloggedIn != 'anonymous' && this.ownProfile._id == this.profile._id) {
      this.isSelf = true;
      console.log(this.isSelf)
    }
    this.isLoading = false;
  }

  elevateAdmin() {
    this.userService.elevate_user_admin(this.userId);
  }

  elevateSuperAdmin() {
    this.userService.elevate_user_super_admin(this.profile.admin._id);
  }

  submit() {
    this.userService.update_user(
      this.userId,
      this.profile?.password ?? '', 
      this.profile?.profilePublic ?? true, 
      this.profile?.commenter?.shownUsername ?? '', 
      this.profile?.commenter?.bio ?? ''
    );
  }

}