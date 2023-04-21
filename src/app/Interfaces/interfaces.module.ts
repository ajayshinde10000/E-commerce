export interface User{
    name:string;
    email:string;
    isEmailVerified:boolean;
    companyName:string;
}

export interface Register{
    name:string;
    email:string;
    password:string;
    companyName:string;
    isLogin:boolean;
    isEmailVerified:boolean;
    role:string;
}

export interface Login{
    email:string;
    password:string;
}