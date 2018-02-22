import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

/*
  Generated class for the MenuApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuApiProvider {

  url: string = "https://mtechmenu.firebaseio.com/";

  constructor(public http: HttpClient) {
    console.log('Hello MenuApiProvider Provider');
  }

  getBreakfastMenuData(): Observable<any>{
    return this.http.get(`${this.url}/breakfast.json`)
      .pipe(
      map((response: Response) => {
        return response;
      }));
  }
  getLunchMenuData(): Observable<any>{
    return this.http.get(`${this.url}/lunchAndDinner.json`)
      .pipe(map((response: Response) => {
        return response;
      }));
  }

}
