import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  user = new User();
  msg = '';
  flag = false;

  constructor(public authServ: AuthService, private service: ServiceService) { }

  ngOnInit(): void {
    this.user = this.authServ.getDataUser();
    this.getFecha();
  }
  

  public getFecha(){
    var sysDate = new Date();
    var modDate = new Date(this.user.fechamodificacion);
    //tDate.setDate(tDate.getDate() + 30);
    if(sysDate > modDate){
      this.msg = "La contraseña debe cambiarse";
      this.user.password = "";
      this.flag = true;
    }else{
      this.flag = false;
      this.msg = "La contraseña es segura";
    }
    console.log(modDate, sysDate);
  }

  public dateModif(fecha): Date{
    var modDate = new Date(fecha);
    fecha.setDate(fecha.getDate() + 30);
    return fecha;
  }

  changePass(){
    this.user.fechamodificacion = this.dateModif(this.user.fechamodificacion);
    this.service.changePwd(this.user)
    .subscribe(
      data =>{
        console.log("Recibido");
      },
      error => {
        console.log("Error")
    }
    );
  }

  
  
}
