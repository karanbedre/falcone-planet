import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Http, ResponseContentType } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public baseUrl: string = environment.baseUrl;

  constructor(private http: Http) { }

  /**
   * @method to perform the http `get` method
   * @param api - name of the service/api to be called
   * @returns the Observable<any>
  */
  get(api: any): Observable<any> {
    return this.http
      .get(this.baseUrl + api, new RequestOptions({
        headers: this.getRequestHeaders()
      }))
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method to perform the http `post` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed to server
   * @returns the Observable<any>
  */
  post(api: any, data: any): Observable<any> {
    return this.http
      .post(this.baseUrl + api, JSON.stringify(data), new RequestOptions({
        headers: this.getRequestHeaders()
      }))
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
 * @method to get the request headers
 * @param api - name of the service/api to be called
 * @param data - data to be passed for deleting
 * @returns the request headers of type `Headers`
*/
  getRequestHeaders(): Headers {
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'platform': 'web',
      'Access-Control-Allow-Origin': '*'
    });
    // headers.set('x-access-token', );
    return headers;
  }

  handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
