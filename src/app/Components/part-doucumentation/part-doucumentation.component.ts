import { Component, OnInit,Inject,ViewEncapsulation} from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { PartService} from '../../Service/app/part.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-part-doucumentation',
  templateUrl: './part-doucumentation.component.html',
  styleUrls: ['./part-doucumentation.component.scss']
})
export class PartDoucumentationComponent implements OnInit {
  tenant:any;
  display_reason:any; 
  reason:any;
  reason_response:any;
  machine_id:any;
  constructor(public dialog: MatDialog,private nav:NavbarService,private service:PartService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')


   }


   openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialog6(): void {
    // console.log(id)

    const dialogRef = this.dialog.open(Backup, {
      width: '250px',
      // data: {id: id,}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialog2(id,cname,jname): void {
    const dialogRef = this.dialog.open(Delete, {
      width: '250px',
      data: {id: id,cuname:cname,joname:jname }

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


   ngOnInit() {
    this.service.tenant_id(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.reason_response=res;
      this.machine_id = this.reason_response[0].id;
      this.service.display_reason(this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
        this.reason=res;
      })  
    });
  }

 

  code_compare(id) {
    this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      this.reason=res;
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
  file2:any;
  machine_id:any;
  constructor(private http: HttpClient,public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private service:PartService) {
    this.machine_id = localStorage.getItem('machine_id')
  }

  fileUpload1(event){
    this.file2 = event.target.files[0];
   
    
}
save(){

  let headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    })
  }  
  var fd = new FormData()

  fd.append('file', this.file2);
  fd.append('id', this.machine_id);
    this.http.post("http://192.168.0.237:4000/api/v1/part_doc_upload",fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res =>{
      
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
      this.dialogRef.close();



    })

}
onNoClick(): void {
  this.dialogRef.close();
}


 
  ngOnInit()
  {}
  
 
  ngOnDestroy(){

  
 
  }

}
@Component({
  selector: 'delete-page',
  templateUrl: 'delete.html',
})
export class Delete {
  login:FormGroup;
  value:any;
  constructor(private fb:FormBuilder,private service:PartService,public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.value = data;
    }

 
  ngOnInit(){
    this.login = this.fb.group({
      
      // id:[this.value.id],
      customer_name:[this.value.cuname],
      job_name:[this.value.joname],
    })
  }

logintest(){
  this.service.option_edit(this.value.id,this.login.value).pipe(untilDestroyed(this)).subscribe(res =>{
  })}

onNoClick(): void {
  this.dialogRef.close();
}

ngOnDestroy(){

  
 
}

}

@Component({
  selector: 'backup-page',
  templateUrl: 'backup.html',
})
export class Backup {
  // value:any;
  constructor(private http: HttpClient,public dialogRef: MatDialogRef<Backup>,@Inject(MAT_DIALOG_DATA) private fb:FormBuilder,private service :PartService) {
   
    // this.value = data;
    // console.log(this.value)
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

   

    
  }
  

  
   
}
