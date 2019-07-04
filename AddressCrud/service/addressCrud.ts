import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Injectable()

export class AddressCrudService{
    private pushUrl="http://localhost:1234/admin/singleAddCrud";
    private getUrl="http://localhost:1234/address/getAllAdresses";

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
    updateAddress(data):Observable<any>{
        console.log(data)
      return this.http.post<any>(this.pushUrl,data).pipe(
      catchError(this.handleError));    
   };
   Addressjsonretrieve(){    
      return this.http.get<any>(this.getUrl);
   }
}
