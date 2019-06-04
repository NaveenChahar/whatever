import { Component } from '@angular/core';
import { AbtcrudService } from '../../MainCruds/AboutCrud/service/abtcrud'

@Component({
    selector:'footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css'],
    providers:[AbtcrudService]
})

export class FooterComponent{
    private readMore=false;
    private aboutData=null;
    private footerData;
    constructor(private abtservice:AbtcrudService){
        this.getInitialData();
    }

    getInitialData() {
        this.abtservice.Aboutjsonretrieve().subscribe(data=>{
            //console.log(data.data);
            this.aboutData=data.data;
        })  
    }

    readmore(){
        this.readMore=true;
    }
}