import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ServiceService } from '../service.service';
import { TokenService } from '../token.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg = '';

  constructor(private _service:ServiceService, private _router:Router, private authUser:AuthService) { }

  ngOnInit(): void {
  }

  login(){

    this.user.nombre = this.user.email;
    
    this.authUser.login(this.user).subscribe((res) => console.log('Login'));
    /*this._service.loginUserFromRemote(this.user)
    .subscribe(
      data =>{
        console.log("Recibido");
        this._router.navigate(['/principal'])
      },
      error => {
        console.log("Error")
        this.msg = "Usuario o contraseña incorrectos. Intente nuevamente";
    }
    );*/
  }

  registration(){
    this._router.navigate(['/registrarusuario']);
  }

}
