import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUserName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  public setToken(token:string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(user:string): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUserName(): string{
    return sessionStorage.getItem(USER_KEY);
  }

  public logout(): void{
    window.sessionStorage.clear();
  }
}
