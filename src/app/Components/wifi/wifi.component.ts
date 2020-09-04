import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WifiService } from '../../Service/app/wifi.service';
import { NavbarService } from '../../Nav/navbar.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
// import Swal from 'sweetalert2';
import { Observable } from "rxjs/Observable";
import { timer } from 'rxjs';
import 'rxjs/add/observable/interval';
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  login: FormGroup;
  hide: boolean = true; 
  scanning:any;
 
  constructor(private fb: FormBuilder, private nav: NavbarService, private service: WifiService, ) {
    this.nav.show();
  }

  ngOnInit() {


    
    this.login = this.fb.group({
      user_name: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  logintest() {
    console.log(this.login.value)
     var data = this.login.value.user_name;
     console.log(data);
     var data1 = this.login.value.password;
     console.log(data1)
    this.service.submit(data,data1).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
    })
  }
  wifi(){
    this.service.scan().pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
      this.scanning = res.wifi_name_list;
      console.log(this.scanning)
      
    })
  

    
   
  }


  ngOnDestroy(){

  }

}
