import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
//import { httpOptions } from "../../../../globalmodel/headerDetails";
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { abtcrudModel } from '../model/abtcrudModel';


@Injectable()

export class AbtcrudService{
    url="http://localhost:1234/admin/about";

    constructor(private http:HttpClient){

    }

    handleError(error:HttpErrorResponse){
        let err='';
          if(error.error instanceof ErrorEvent){
           err='FrontEnd Error'
            } else {
         err = 'BackendError'
             }
      
              return throwError(
          err);
             };
    uploadForm(data:NgForm):Observable<any>{
        
   return this.http.post<any>(this.url,data).pipe(
   catchError(this.handleError));    
   };
   Aboutjsonretrieve(){    
    return this.http.get<abtcrudModel[]>(this.url);
   }

}