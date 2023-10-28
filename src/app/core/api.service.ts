import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:9000";

  constructor(
    private http: HttpClient,
  ) { }

  getJson(
    uri: string,
  ): Observable<any> {


    const headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "http://localhost:4200")
     // .set('Content-type', 'application/json; charset=utf-8')
    //  .set('Accept', 'application/json; charset=utf-8')


    return this.http
      .get(uri, {
       // observe: 'response',
        //withCredentials: true,
        headers: headers,
      })

      .pipe(
      //  map((data) => data.body),
        catchError(this.getHandleError())
      );
  }

  errorWith(status: number, msg: string): any {
    return {
      status,
      msg,
    };
  }


  getHandleError() {
    const that = this;
    return (e: HttpResponse<any>): Observable<any> => {

      if (e.status === 403) {
        const msg = 'You are not allowed';
        return throwError(() => that.errorWith(e.status, msg));

      } else if (e.status === 400) {
        const msg = `Invalid action : ${e.toString()}`;
        return throwError(() => that.errorWith(e.status, msg));

      } else if (e.status === 404) {
        const msg = `Resource not found : ${e.toString()}`;
        return throwError(() => that.errorWith(e.status, msg));

      } else if (e.status === 412) {
        const msg = `Resource has been modified since last access`;
        return throwError(() => that.errorWith(e.status, msg));

      } else if (e.status === 0) {
        const msg = 'API is down';
        return throwError(() => that.errorWith(e.status, msg));

      } {
        const msg = `API error (HTTP ${e.status})`;
        return throwError(() => that.errorWith(e.status, msg));

      };
    }
  }
}