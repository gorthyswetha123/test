import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = "http://localhost:1994/nodeapp";
  constructor(private http:HttpClient) { }

  /* Add  */
  public addCreateEmployee(data): Observable<any> {
    try {
      const response = this.http
        .post(this.apiUrl+ "" +'/postprjctitems', data)
        .pipe(map((resp) => resp));
      return response;
    } catch (error) {
      return error;
    }
  }
  public getBonblocDtl(id): Observable<any> {
    try {
      const response = this.http
        .get(this.apiUrl+ "" +'/employeeDetailsbyID/'+id )
        .pipe(map((resp) => resp));
      return response;
    } catch (error) {
      return error;
    }
  }

  public getMclaneDtl(id): Observable<any> {
    try {
      const response = this.http
        .get(this.apiUrl+ "" +'/employeeDetailsbyMclaneDt/'+id)
        .pipe(map((resp) => resp));
      return response;
    } catch (error) {
      return error;
    }
  }

}
