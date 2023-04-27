import { Component, OnInit } from '@angular/core';
import { ApiUser, CompanyDetails } from 'src/app/Interfaces/interfaces.module';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {


  isUpdateTrue:boolean = false;
  name!:string;
  email!:string;

  myUser!:ApiUser;

  constructor(private userService: UserService) { 
    this.userService.getUser().subscribe((data:any)=>{
      this.myUser = data;
      this.name = data._org.name;
      this.email = data._org.email;
    });
  }

  ngOnInit(): void {
    
  }

  updateCompanyProfileInfo(){
    this.isUpdateTrue = true;
  }

  cancelEdit(){
    this.isUpdateTrue = false;
  }

  editCompanyDetails(data:CompanyDetails){
    console.log(data);
    this.userService.updateCompanyInfo(data).subscribe((data)=>{
      console.log(data);
    },
    (err)=>{
      alert("Email Already taken");
    })
    this.isUpdateTrue = false;
  }

}
