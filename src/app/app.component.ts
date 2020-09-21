import { CommonService } from './common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isEdit = false;
  allUsers: Object;
  userObj = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    id: '',
  };
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getLatestUsers();
  }

  addUser(formObject) {
    this.commonService.createUser(formObject).subscribe((response) => {
      this.getLatestUsers();
    });
  }

  getLatestUsers() {
    this.commonService.getAllUser().subscribe((response) => {
      this.allUsers = response;
    });
  }

  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUsers();
    });
  }
  deleteUser(user) {
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUsers();
    });
  }
}
