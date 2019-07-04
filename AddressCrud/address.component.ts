import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddressCrudService } from './service/addressCrud';
import { AddressEditDialogComponent } from './Dialogs/Edit/edit-dialog.component';
import { AddressDeleteDialogComponent} from './Dialogs/Delete/delete-dialog.component'
import {AddressAddDialogComponent} from './Dialogs/Add/add-dialog.component'
@Component({
    selector:'addressCrud',
    templateUrl:'./address.component.html',
    styleUrls:['./address.component.css'],
    providers:[AddressCrudService]
})
export class AddressCrud implements OnInit{
    private columns = [];
    displayedColumns=[];
    private dataSource=[];


    constructor(public dialog: MatDialog,public addcrud:AddressCrudService) {
    }


    ngOnInit(){
        this.addcrud.Addressjsonretrieve().subscribe(data=>{
            this.dataSource=data;
            console.log(this.dataSource[0]);
            this.makeColoumns();    
        })
    }

    makeColoumns(){           //used to draw columns of table
        var object=this.dataSource[0];
            for(let key in object){
                this.columns.push(key);
            }
            console.log(this.columns);
            this.displayedColumns=this.columns.concat(['actions']);
        
    }

    addNew(){
        const dialogRef=this.dialog.open(AddressAddDialogComponent,{
            height:'300px',
            width:'400px',
            data:this.dataSource[0],
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                //change the data in db
                console.log(result);            
                let obj={
                    optype:'add',
                    areaName:result.addarray[1],
                    city:result.addarray[0],
                    pincode:result.addarray[2],
                    status:result.addarray[3]
                } 
                
                this.addcrud.updateAddress(obj).subscribe(data=>{
                    if(data!=null){
                        this.addcrud.Addressjsonretrieve().subscribe(data=>{
                             if(data!=null){
                                 this.dataSource=data;
                             }
                        })
                    }
                })
            }            
          });
    }
    startEdit(row){
        const dialogRef=this.dialog.open(AddressEditDialogComponent,{
            height:'300px',
            width:'400px',
            data:row,
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                //change the data in db
                console.log(result);          
                let obj={
                    optype:'edit',
                    areaId:row.areaId,
                    areaName:result.addarray[1],
                    city:result.addarray[0],
                    pincode:result.addarray[2],
                    status:result.addarray[3]
                }  
                this.addcrud.updateAddress(obj).subscribe(data=>{
                    if(data!=null){
                        this.addcrud.Addressjsonretrieve().subscribe(data=>{
                             if(data!=null){
                                 this.dataSource=data;
                             }
                        })
                    }
                })  
            }            
          });   
    }
    deleteItem(row){
        const dialogRef=this.dialog.open(AddressDeleteDialogComponent,{
            height:'300px',
            width:'400px',
            data:null,
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){   
                //delete in db
                //console.log('deleted');
                let obj={
                    optype:'delete',
                    areaId:row.areaId,
                    areaName:row.areaName,
                    city:row.city,
                    pincode:row.pincode,
                    status:row.status
                } 
                this.addcrud.updateAddress(obj).subscribe(data=>{
                    if(data!=null){
                        this.addcrud.Addressjsonretrieve().subscribe(data=>{
                             if(data!=null){
                                 this.dataSource=data;
                             }
                        })
                    }
                })  
            }
          });
    }
}