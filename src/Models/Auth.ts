import { ClientType } from "./ClientType";

export interface LoginModel {
    email: string;
    password: string;
    clientType: ClientType;
  }
  

export interface Credentials {
    email: string;
    password: string;
    clientType: ClientType;
}

export interface User {
    token: string;
    clientType: ClientType;
}