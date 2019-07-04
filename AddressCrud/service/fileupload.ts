import { Injectable } from "@angular/core";
import {HttpClient,HttpErrorResponse} from "@angular/common/http";
import { Observable,throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';

@Injectable()

export class fileUpload{
    private url="http://localhost:1234/admin/bulkAddUpload";
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
    exceluploader(form:FormData){

      console.log(' i m here')
      console.log(form);
       return this.http.post<any>(this.url,form).pipe(
         catchError(this.handleError));    
       };
}