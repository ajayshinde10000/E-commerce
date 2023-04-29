export interface User{
    name:string;
    email:string;
    isEmailVerified:boolean;
    companyName:string;
}

export interface Register{
    _org?: any;
    name:string;
    email:string;
    password:string;
    companyName:any;
    isLogin:boolean;
    isEmailVerified:boolean;
    role:string;
}

export interface RegisterApi{
    name:string;
    email:string;
    password:string;
    company:string;
}

export interface Login{
    email:string;
    password:string;
}

export interface ApiUser{
    _id: string,
    name: string,
    _org:{
      id: string,
      name: string
      email: string
    },
    email:string,
    role: string,
    isEmailVerified:boolean,
    deleted:boolean,
    createdAt:any,
    updatedAt:any
}


export interface CompanyDetails{
    name:string;
    email:string;
  }