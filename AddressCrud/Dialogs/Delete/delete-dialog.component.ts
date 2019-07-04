import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'


@Component({
    selector:'addressDelete-dialog',
    templateUrl:'./delete-dialog.component.html',
    styleUrls:['./delete-dialog.component.css']
})

export class AddressDeleteDialogComponent{
    constructor(@Inject(MAT_DIALOG_DATA) public object: any,
                        public dialogRef: MatDialogRef<AddressDeleteDialogComponent>){
    }

    Cancel(){
        this.dialogRef.close();
    }

    Delete(){
        this.dialogRef.close(true);//change later
        //manipulate the object here and fill it into result
    }
}