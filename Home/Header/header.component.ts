import { Component,HostListener } from '@angular/core';


@Component({
    selector:'header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent{
    private address="Caimbotore";
    private location="Kerala";
    private addressSelector:boolean=false;
    private isSticky:boolean=false;

    showAddress(){
        this.addressSelector=true;
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
      this.isSticky = window.pageYOffset >= 127;        //sticky navbar
    }

}