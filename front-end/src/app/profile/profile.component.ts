import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  myDetails: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.getProfileData();
  }
  getProfileData(): void {
        console.error('Error retrieving profile data');
  }
}