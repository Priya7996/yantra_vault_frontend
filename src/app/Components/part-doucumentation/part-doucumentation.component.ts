import { Component, OnInit,Inject,ViewEncapsulation} from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { PartService} from '../../Service/app/part.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
      console.log(this.reason)
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
  constructor(public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private service:PartService) {
    this.machine_id = localStorage.getItem('machine_id')
  console.log(this.machine_id )
  }

  fileUpload1(event){
    this.file2 = event.target.files[0];
    console.log(this.file2);
   
    
}
save(){
  console.log(this.file2);
  var fd = new FormData()

  fd.append('file', this.file2);
  fd.append('id', this.machine_id);
  console.log(fd);
  this.service.file_upload(fd).pipe(untilDestroyed(this)).subscribe(res =>{
    console.log(res);
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
   
  constructor(private service:PartService,public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any) {
    
    }

 
  ngOnInit(){}





}