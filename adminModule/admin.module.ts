import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { routingComponents } from './admin-routing.module';


@NgModule({
    declarations:[
        AdminComponent,
        routingComponents
    ],
    exports:[],
    imports:[ 
        AdminRoutingModule
    ]
})

export class AdminModule{

}