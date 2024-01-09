import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MgdRestClientProvider {

  constructor(
    private http: HttpClient
  ) { }

  private getHeader() {

      var httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization,Upgrade-Insecure-Requests',
          "Cache-Control": 'no-cache',
          "Pragma": 'no-cache',
          "channel": 'MOBILE'
        })
      };
      return httpHeaders;
  }

  public get(httpUrl: string) {
    var httpHeaders = this.getHeader();
    console.log("call GET " + httpUrl, httpHeaders);
    return this.http.get(httpUrl, httpHeaders).pipe(
      timeout(20000),
      catchError(error => {
        console.error("Rest catch error", error);

        if (error && error.status == 500) {
          throw error;
        } else {
          console.error('Timeout error')
          let e = {
            error: {
              errorCode: "TIMEOUT",
              errorDescription: "TIMEOUT"
            }
          }
          throw e;
        }
      })
    );
  }

  public post(httpUrl: string, data: any, httpHeaders : any = null) {
    if (httpHeaders == null) {
      httpHeaders = this.getHeader();
    }
    
    console.log("call POST " + httpUrl, httpHeaders);
    console.debug("headers ", JSON.stringify(httpHeaders));
    return this.http.post(httpUrl, JSON.stringify(data), httpHeaders).pipe(
      timeout(20000),
      catchError(error => {
        console.error("Rest catch error", error);

        if (error && error.status == 500) {
          throw error;
        } else {
          console.error('Timeout error')
          let e = {
            error: {
              errorCode: "TIMEOUT",
              errorDescription: "TIMEOUT"
            }
          }
          throw e;
        }
      })
    );
  }

  public put(httpUrl: string, data: any) {
    var httpHeaders = this.getHeader();
    console.log("call POST " + httpUrl, httpHeaders);
    return this.http.put(httpUrl, JSON.stringify(data), httpHeaders);
  }

  public patch(httpUrl: string, data: any) {
    var httpHeaders = this.getHeader();
    console.log("call PATCH " + httpUrl, httpHeaders);
    return this.http.patch(httpUrl, JSON.stringify(data), httpHeaders);
  }

  public delete(httpUrl: string) {
    var httpHeaders = this.getHeader();
    console.log("call DELETE " + httpUrl, httpHeaders);
    return this.http.delete(httpUrl, httpHeaders);
  }

  public healthCheck(): Observable<any> {

    console.debug("ENVIRONMENT: " + environment.environmentName);
    console.debug("BASE URL: " + environment.baseUrl);

    var httpUrl = environment.baseUrl + '/health-check';
    return this.get(httpUrl);
  }
}