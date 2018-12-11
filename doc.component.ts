import { Component } from '@angular/core';
import { Details } from './details';

@Component({
    selector:'doc-comp',
    templateUrl:'./doc.component.html',
    styleUrls:['./doc.component.css']

})

export class DocumentComponent{

    //private details:Details;
    private details:Details=new Details();
    //constructor(private details:Details){

    //}

    onSubmit(){
        console.log(this.details);
    }
}