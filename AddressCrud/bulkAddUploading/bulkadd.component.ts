import { Component,OnInit } from "@angular/core";
import { fileUpload } from '../service/fileupload'


@Component({
    selector:'bulkAddCrud',
    templateUrl:'./bulkadd.component.html',
    styleUrls:['./bulkadd.component.css'],
    providers:[fileUpload]
})
export class BulkAddUploading{
    private formdata:FormData;
    
    constructor(private fileUpload:fileUpload){}
    ngOnInit() {
        this.formdata = new FormData();
        //this.formdata.set('idToken',localStorage.getItem('id_token'))
    }

    OnChange(inputParam:HTMLInputElement){
        if(inputParam.files.length!=0){
        this.formdata.set(inputParam.getAttribute("name"),inputParam.files[0]); 
      }
    }


    uploadExcel(){

        this.fileUpload.exceluploader(this.formdata).subscribe((res)=>{
            if(res){
              //this.openSnackBar();
              console.log('upload success');
            }},
        
        err=>{
            alert(err);
        
        })}
}