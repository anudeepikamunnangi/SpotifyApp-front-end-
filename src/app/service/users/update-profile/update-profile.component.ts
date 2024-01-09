import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/model/UserProfile';
import { UserProfileDataService } from 'src/app/service/data/user-profile-data.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  userProfile!: UserProfile;

  emailExists: boolean = false;
  message='';

  constructor(private userProfileService: UserProfileDataService, private fb: FormBuilder) {
    
  }

  profileForm = this.fb.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    dateOfBirth:[''],
  
  });
 
  saveForm(){
    console.log('Form data is ', this.profileForm.value);
    
    this.userProfileService.updateuser(this.profileForm.value).subscribe({
      next: (v) => {
        console.log(v.email)
      },
      error: (e) => {console.error('e')},
      complete: () => {this.message = "Details updated"}
    });
  }
  OnlyAlbhabets(event: any): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode == 32 || ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))) {
      return true
    }


    return false;
  }
  ngOnInit(): void {
    this.getUserProfile()
    // Disable the email input field
    

  }
  
  getUserProfile(){
    this.userProfileService.getUserById().subscribe({
      next: (v) => {
        console.log(v)
        
        this.profileForm = this.fb.group({
          firstName:v.firstName,
          lastName:v.lastName,
          email:v.email,
          dateOfBirth:v.dateOfBirth,
          // gender:v.gender
        });

      },
      error: (e) => {console.error('e')},
      complete: () => console.info('complete')
    });

    console.log(this.profileForm.value)
  }

  

}
