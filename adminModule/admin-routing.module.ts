import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { ProductUploadComponent } from './productUpload/product.component';
import { ProductSearchComponent } from './productSearch/productSearch.component';
import { AdminComponent } from './admin.component';



const routes: Routes = [
  {path:'', component: AdminComponent,
   children:[
    {path:'productUpload', component: ProductUploadComponent},
    {path:'productSearch', component: ProductSearchComponent},
   ]},
    
  
  ];


@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }
  export const routingComponents=[AdminComponent,ProductUploadComponent,ProductSearchComponent];
  