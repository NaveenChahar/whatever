import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { AddDialogComponent } from '../Dialogs/Add/add-dialog.component';
import { EditDialogComponent } from '../Dialogs/Edit/edit-dialog.component';
import { DeleteDialogComponent } from '../Dialogs/Delete/delete-dialog.component';



@Component({
    selector:'home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})

export class HomeComponent implements OnInit{
    columns = [];
    displayedColumns=[];
    public dataSource=[{
        id:1,
        title:"whtever",
        state:"solid",
        url:"abdc.com",
        created_at:"1",
        updated_at:"2",
        action:[{
            ok:"its ok"
        }],

    },
    {
        id:1,
        title:"whatever",
        state:"liquid",
        url:"abdc.com",
        created_at:"1",
        updated_at:"3",
        action:[{
            ok:"its not ok"
        }],

    },
    
    ];

    constructor(public dialog: MatDialog,) {}


    ngOnInit(){
        this.makeColoumns();
        
    }

    objCheck(value){
        if(typeof(value)=="object"){
            return false;
        }
        else{
            return true;
        }
    }

    addNew(){
        const dialogRef=this.dialog.open(AddDialogComponent,{   //creating the reference
            height:'400px',
            width:'400px',
            data:this.dataSource[0],    //sending data to the dialog component
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                console.log(result);
                this.dataSource=result[0];
                console.log(this.dataSource);
                this.columns=[];
                this.makeColoumns();
            }
          });
    }
    
    startEdit(index:any){
        const dialogRef=this.dialog.open(EditDialogComponent,{
            height:'400px',
            width:'400px',
            data:this.dataSource[index],
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                var clone = this.dataSource.slice();    //this had to be done bcz if we directly splice the
                clone.splice(index,1,result);                  //datasource then it is not able to detect changes on its own
                this.dataSource=clone;  
            }            
          });   
    }

    deleteItem(index:any){
        const dialogRef=this.dialog.open(DeleteDialogComponent,{
            height:'400px',
            width:'400px',
            data:this.dataSource[index],
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                console.log(index);
                var clone = this.dataSource.slice();    //this had to be done bcz if we directly splice the
                clone.splice(index,1);                  //datasource then it is not able to detect changes on its
                this.dataSource=clone;                  //own,so we need to change it manually by assigning the clone
                console.log(this.dataSource);           //array to it
            }
          });
    }

    makeColoumns(){           //used to draw columns of table
        var object=this.dataSource[0];
            for(let key in object){
                if(this.objCheck(object[key])){
                    this.columns.push(key);
                }
            }
            this.displayedColumns=this.columns.concat(['actions']);
        
    }

}