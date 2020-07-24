import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http/http-service.service';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public storedData: any;
  public resetHome = new Subject<any>();

  constructor(private httpService: HttpServiceService) { }

  get(url: any): Observable<any> {
    return this.httpService.get(url).pipe(
      map((res: Response) => {
        return res.json()
      }),
      catchError(error => {
        return throwError(error.json())
      })
    );
  }

  post(url: any, data: any): Observable<any> {
    return this.httpService.post(url, data).pipe(
      map((res: Response) => {
        return res.json()
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  storeTimePlanet(data) {
    this.storedData = data;
  }

  getTimePlanetData() {
    return this.storedData;
  }
}
