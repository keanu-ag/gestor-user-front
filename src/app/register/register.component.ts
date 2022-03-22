import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  msg: any;

  constructor(private _service: ServiceService, private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._service.registerNewUser(this.user)
    .subscribe(
      data=>{
        console.log("Respuesta recibida");
        this.msg = "El usuario se registro correctamente";
        this._router.navigate(['/login']);
      },
      error=>{
        console.log("Error");
        this.msg=error.error;
      }
    );
  }
}
