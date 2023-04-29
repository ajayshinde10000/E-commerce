import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  isUpdateStatus: boolean = false;
  isCreateStatus: boolean = false;
  isAlertTrue: boolean = false;

  name!: string;
  password!: string;
  email!: string;
  userId!: string;
  role!: string;

  passVisible:string='password';

  constructor(private userService: UserService) {
    this.loadUsers();
    this.pageChange(0);
  }

  toggleImg(){
    if(this.passVisible=='text'){
      this.passVisible = 'password'
    }
    else{
      this.passVisible = 'text';
    }
  }

  loadUsers() {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role = '';
    this.userId = '';
    this.pageChange(this.page);

    // this.userService.getAllUsers().subscribe((data:any)=>{
    //   this.userArr = data.results;

    // })
  }

  userArr: any;

  ngOnInit(): void {}

  user: any;

  updateStatus(updateUser: any) {
    this.user = updateUser;
    this.name = updateUser.name;
    this.email = updateUser.email;
    this.userId = updateUser._id;
    this.isUpdateStatus = true;
  }

  createStatus() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = '';
    this.isCreateStatus = true;
  }

  updateUser() {
    let obj = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
    this.userService.updateUserInfo(obj, this.userId).subscribe(
      (data) => {
        console.log(data);
        this.loadUsers();
        this.isUpdateStatus = false;
      },
      (err) => {
        this.isAlertTrue = true;
        setTimeout(() => {
          this.isAlertTrue = false;
        }, 3000);
        console.log(err);
      }
    );
  }

  cancelUpdateUser() {
    this.isUpdateStatus = false;
  }

  isDeleteAlertShow: boolean = false;
  deleteUser(myUser: any) {
    this.name = myUser.name;
    this.userId = myUser._id;
    this.userService.deleteUser(this.userId).subscribe(
      (data) => {
        this.loadUsers();
        this.isDeleteAlertShow = true;
        setTimeout(() => {
          this.isDeleteAlertShow = false;
        }, 4000);
      },
      (err) => {
        alert('Something Went Wrong On Server');
      }
    );
  }

  createUserStatus() {
    this.isCreateStatus = true;
  }

  cancelCreateUser(){
    this.isCreateStatus = false;
  }

  userCreatedAlert: boolean = false;

  createUser() {
    let obj = {
      email: this.email,
      password: this.password,
      name: this.name,
      role: this.role,
    };

    this.userService.createUser(obj).subscribe(
      (data) => {
        console.log(data);
        this.isCreateStatus = false;
      },
      (err) => {
        this.userCreatedAlert = true;

        setTimeout(() => {
          this.userCreatedAlert = false;
        }, 4000);
        console.log(err);
      }
    );
  }

  updateRoleStatus(data: any) {
    this.userId = data._id;
    this.role = data.role;
  }

  eidtRoleByDropdown(data:any){
    console.log(data);
    this.role=data;
  }

  updatedRoleStatus: boolean = false;
  updateRole() {
    this.userService
      .updateUserRole(this.userId, this.role.toLowerCase())
      .subscribe(
        (data) => {
          console.log(data);
          this.updatedRoleStatus = false;
          this.loadUsers();
        },
        (err) => {
          this.updatedRoleStatus = true;
          setTimeout(() => {
            this.updatedRoleStatus = false;
          }, 4000);
        }
      );
  }

  sortByName(val: any) {
    // this.userService.sortByQueryParams(val).subscribe((data:any)=>{
    //   console.log(data);
    //   this.userArr = data.results;
    //   if(data=='name'){
    //     this.userArr.sort();
    //     console.log("Data From Sorting",this.userArr);
    //   }
    // })

    this.page = 1;
    this.userService
      .sortWithLimit(val, this.limit, this.page)
      .subscribe((data: any) => {
        console.log(data)
        this.userArr = data.results;
        if (val == 'name') {
          this.userArr.sort();
          console.log('Data From Sorting', this.userArr);
        }
      });
  }

  totalPages!: any;
  page: number = 1;
  limit: number = 5;

  pageCountChange(val: any) {
    this.userService.getUsersByLimit(val).subscribe((data: any) => {
      console.log(data);
      this.limit = val;
      this.page=1;
      console.log(this.limit);
      //this.totalPages = data.totalPages;
      this.totalPages = Array(data.totalPages).fill(4);
      console.log(this.totalPages);
      this.userArr = data.results;
    });
  }

  nextDisble: boolean = false;
  prevDisable: boolean = false;

  next() {
    
    if (this.page < this.totalPages.length) {
      this.page++;
      this.pageChange(this.page);
      this.targetBtn(this.mydiv.nativeElement,this.page);
      console.log("From Next",this.page)
      this.nextDisble = false;
    } else {
      this.nextDisble = true;
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.pageChange(this.page);
      this.prevDisable = false;
      console.log("From Prev",this.page)
      this.targetBtn(this.mydiv.nativeElement,this.page);
    } else {
      this.prevDisable = true;
    }
  }

  pageChange(ind: any) {
    this.page = ind;
    this.userService
      .getUsersByPageAndLimit(this.limit, this.page)
      .subscribe((data: any) => {
        this.userArr = data.results;
        this.totalPages = Array(data.totalPages).fill(4);
      });
  }

  searchByName(search: any){
    if (search == '') {
      return this.loadUsers();
    }
    console.log(search);
    let newArr: any = [];
    this.userArr.filter((data: any) => {
      if(data.name.toLowerCase().includes(search.toLowerCase())){
        newArr.push(data);
      }
    });
    this.userArr = newArr;
  }

  @ViewChild('pageNode', { static: false }) public mydiv!: ElementRef;

  targetBtn(event:any,ind:number){
    console.log(this.mydiv.nativeElement);
    let data = event.childNodes;
    for(let i=0;i<data.length-1;i++){
      if(i==ind-1){
        event.childNodes[i].classList.add('targetedBtn');
      }
      else{
        event.childNodes[i].classList.remove('targetedBtn');
      }
    }
  }

}
