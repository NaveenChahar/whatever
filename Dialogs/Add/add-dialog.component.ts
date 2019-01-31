import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import { FormArray, FormControl, Validators, NgForm, FormGroup} from '@angular/forms';

@Component({
    selector:'add-dialog',
    templateUrl:'./add-dialog.component.html',
    styleUrls:['./add-dialog.component.css']
})

export class AddDialogComponent implements OnInit{
    private demo:FormGroup;
    private keyArray=[];
    private resultArray=[]; 
    //private addarray:FormArray;
    constructor(@Inject(MAT_DIALOG_DATA) public object: any,
                        public dialogRef: MatDialogRef<AddDialogComponent>){
    }


    ngOnInit(){
        this.demo=new FormGroup({            //form group is required bcz form doesnt understand formarray property
            addarray:new FormArray([            
            ])
        })

        for(let key in this.object){
            if(this.objCheck(this.object[key])){
                this.keyArray.push(key);
                (<FormArray>this.demo.get('addarray')).push(new FormControl('',Validators.required));
            }
            else{
                this.resultArray.push(this.object[key]);
            }
        }
    }
    Cancel(){
        this.dialogRef.close();
    }

    Add(){
        this.dialogRef.close(this.resultArray);
        //add form data to session storage to form object
    }

    objCheck(value){
        if(typeof(value)=="object"){
            return false;
        }
        else{
            return true;
        }
    }
}
