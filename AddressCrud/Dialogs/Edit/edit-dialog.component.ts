import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormArray, FormControl, Validators, NgForm, FormGroup} from '@angular/forms';


@Component({
    selector:'addressEdit-dialog',
    templateUrl:'./edit-dialog.component.html',
    styleUrls:['./edit-dialog.component.css']
})

export class AddressEditDialogComponent{
    private demo:FormGroup;
    private keyArray=[];
    private resultArray=[]; 
    constructor(@Inject(MAT_DIALOG_DATA) public object: any,
                        public dialogRef: MatDialogRef<AddressEditDialogComponent>){
    }

    ngOnInit(){
        this.demo=new FormGroup({
            addarray:new FormArray([            
            ])
        })

        for(let key in this.object){
            if(this.keyCheck(key)){              //creation of formarray and reactive form,validations
                this.keyArray.push(key);                      //based on object recieved
                (<FormArray>this.demo.get('addarray')).push(
                    new FormControl(this.object[key],Validators.required));
            }
            else{
                this.resultArray.push(this.object[key]);
            }
        }
    }

    Cancel(){
        this.dialogRef.close();
    }

    Edit(object){
        this.dialogRef.close(object);
        //store in permanent obj as well
    }

    keyCheck(key){
        if(key=="areaId"){
            return false;
        }
        else{
            return true;
        }
    }
}