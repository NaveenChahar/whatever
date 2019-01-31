import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormArray, FormControl, Validators, NgForm, FormGroup} from '@angular/forms';


@Component({
    selector:'edit-dialog',
    templateUrl:'./edit-dialog.component.html',
    styleUrls:['./edit-dialog.component.css']
})

export class EditDialogComponent{
    private demo:FormGroup;
    private keyArray=[];
    private resultArray=[]; 
    constructor(@Inject(MAT_DIALOG_DATA) public object: any,
                        public dialogRef: MatDialogRef<EditDialogComponent>){
    }

    ngOnInit(){
        this.demo=new FormGroup({
            addarray:new FormArray([            
            ])
        })

        for(let key in this.object){
            if(this.objCheck(this.object[key])){              //creation of formarray and reactive form,validations
                this.keyArray.push(key);                      //based on object recieved
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

    Edit(newObject:any){
        console.log(newObject);//create a better object and send it as result
        var i=0;
        for(let key in this.object){
            if(i<newObject.addarray.length){
                this.object[key]=newObject.addarray[i];          //form values are transferred to object
            }
            i++;
        }
        this.dialogRef.close(this.object);
        //store in permanent obj as well
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