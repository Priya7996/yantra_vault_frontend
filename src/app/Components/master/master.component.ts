import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import {ProgramListService} from '../../Service/app/programlist.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class MasterComponent implements OnInit {
  date: any;
  myLoader = false;
  startDate = new Date(2020, 0, 1);

  masterate:any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  data:string;   
  machine_response: any;
  tenant: any;
  reason: any;
  machine_id:any;
  slavate:any;
  user:any;
  add_value:any;
  id:any;
  constructor(private fb:FormBuilder,public dialog: MatDialog,private nav:NavbarService,private service:ProgramListService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
    this.id = localStorage.getItem('machine_id')
    this.user = localStorage.getItem('user_id')


   }
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
   dataSource=new MatTableDataSource
   slave=new MatTableDataSource

   slavelist: string[] = ['position', 'name', 'weight', 'symbol','action'];
  
  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(Delete, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  
  ngOnInit() {
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      // this.service.filelist( this.machine_response.id).subscribe(res =>{
        console.log(res);
        this.machine_id = this.machine_response[0].id;
        console.log(this.machine_id)
        let data = this.machine_id;
        console.log(data)

        localStorage.setItem('machine_id',data);
        this.getmachine(this.machine_response[0].id)
      });
   
  }

  upload(demo){
    console.log(demo,"test")
    console.log(this.machine_id)

    this.service.cnc_upload(demo,this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
      alert(res.status)
      location.reload()
    })
  }


  new_download(idest,val){

  let scotch ={
      "id": this.machine_id,
      "file_name": idest,
      "user_id": this.user,
      "position": val
    }
    console.log(scotch)

    this.service.download(scotch).pipe(untilDestroyed(this)).subscribe(res =>{

console.log(res);
 var file = new Blob([res], {
     type: 'text/json;charset=utf-8'
   });

   var data = "text/json;charset=utf-8," + encodeURIComponent(data);
  saveAs(file, scotch.file_name + ".json");
      
    
    })
  }

  

  

    

  
  new_sdownload(latest,position){

    let scotch ={
        "id": this.machine_id,
        "file_name":latest,
        "user_id": this.user,
        "position": position
      }
      console.log(scotch)
  
      this.service.downloaded(scotch).pipe(untilDestroyed(this)).subscribe(res =>{
        console.log(res);
        var file = new Blob([res], {
          type: 'text/json;charset=utf-8'
        });
     
        var data = "text/json;charset=utf-8," + encodeURIComponent(data);
       saveAs(file, scotch.file_name + ".json");
           
         
         })
       }
       
     

  
  reload() {
    throw new Error("Method not implemented.");
  }

  new_check(val){
    console.log(val,"test")
    console.log(this.machine_id)

    this.service.cnc_receive(val,this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
      alert(res.status)
      location.reload()
    })
  }


  getmachine(id) {
    this.myLoader = true;
     this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
      this.myLoader = false;

      this.reason=res;
      this.masterate = res.master_location
      this.slavate =res.slave_location
      console.log(this.slavate)
      console.log(this.masterate)
      this.dataSource=new MatTableDataSource(this.reason)
      this.slave=new MatTableDataSource(this.reason)
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
  }
 

    

  ngOnDestroy(){

  }


}

@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
})
export class Dialog {
  test:FormGroup;
  fileName1:any;
  machine_response: any;
  tenant: string;
  file2:any;
  machine_id:any;
  daterangepicker:any;
  constructor(public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:ProgramListService) {
  this.tenant = localStorage.getItem('tenant_id')  
  this.machine_id = localStorage.getItem('machine_id')
  console.log(this.machine_id )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileUpload1(event){
    this.file2 = event.target.files[0];
    console.log(this.file2);
   
    
}
  ngOnInit()
  {
    this.test=this.fb.group ({
      machine_id:["",],
      revision_no:["",],

    })

    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      
    });

  }
  
  logintest()
  {
    console.log(this.test.value);
    console.log(this.file2);
    var fd = new FormData();
    fd.append('id', this.test.value.machine_id);
    fd.append('revision_no','1');
    fd.append('file',this.file2);
    console.log(fd);

    this.service.file_upload(fd).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)

    })


   


    
  }
 
   ngOnDestroy(){

  }

}
@Component({
  selector: 'delete-page',
  templateUrl: 'delete.html',
})
export class Delete {
  date: any;
  machine_id:any;
  login:FormGroup;
  add_val: any;  
  constructor(private service:ProgramListService,public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    this.machine_id = localStorage.getItem('machine_id')
    console.log(this.machine_id )
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()


  {

    
    this.login = this.fb.group({
      user_name:["",],
      reason:["",],
      date:["",]
    })
  }
  logintest()
  {

    console.log(this.login.value);
    this.add_val = this.login.value;
    this.add_val["id"] = this.machine_id;
      this.service.delete(this.login.value).pipe(untilDestroyed(this)).subscribe(res =>{
        console.log(res.status);
        if (res['status'] != null) {
          Swal.fire(res['status'])
        }
        this.dialogRef.close();

      })
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   ngOnDestroy(){

  }

}