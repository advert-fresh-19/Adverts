import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/internal/operators';

import {Advert} from '../models/advert.interface';

export interface View {
  advert_id: string;
  count: number;
}

@Injectable()
export class AdvertService {

  public result = [];

  private baseApiUrl = 'https://api.backendless.com/C60E23B4-0E9D-2339-FF1A-FB80040F5F00/D20CC1CF-0C67-3926-FF2E-1D07982B9400/data';
  private advertsApiUrl = '/list_adverts';
  private viewsApiUrl = '/views_list';

  constructor(private http: HttpClient) {
  }

  getAllEdverts(): Observable<Advert[]> {
    return this.http.get<Advert[]>(`${this.baseApiUrl}${this.advertsApiUrl}?pageSize=100`);
  }

  getAdvertsByUser(userId: string): Observable<Advert[]> {
    return this.http.get<Advert[]>(`${this.baseApiUrl}${this.advertsApiUrl}?where=user_id='${userId}'&&pageSize=100`);
  }

  removeAdvert(advertId: string): void {
    this.http.delete(`${this.baseApiUrl}/bulk${this.advertsApiUrl}?where=objectId='${advertId}'`)
      .subscribe(() => {
        this.http.delete(`${this.baseApiUrl}/bulk${this.viewsApiUrl}?where=advert_id='${advertId}'`);
      });
  }

  removeAllAdvertsbyUser(userId: string): void {
    this.http.delete<Advert>(`${this.baseApiUrl}/bulk${this.advertsApiUrl}?where=user_id='${userId}'`);
  }

  getAdvertById(advertId: string): Observable<Advert> {
    return (this.http.get<Advert[]>(`${this.baseApiUrl}${this.advertsApiUrl}?where=objectId='${advertId}'`))
      .pipe(map(([advert]) => advert));
  }

  createAdvert(adver: Advert): Observable<Advert> {
    return this.http.post<Advert>(`${this.baseApiUrl}${this.advertsApiUrl}`, adver);
  }

  createView(advert_Id: string) {
    this.http.post(`${this.baseApiUrl}${this.viewsApiUrl}`, {advert_Id: advert_Id});
  }

  getAllView(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}${this.viewsApiUrl}?pageSize=100`);
  }

  updateViewByAdvertId(advertId: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}${this.viewsApiUrl}?where=advert_Id='${advertId}'`)
      .pipe(
        switchMap((view) => {
          if (view[0]) {
            const newView = view[0];
            newView.count += 1;
            return this.http.put(`${this.baseApiUrl}${this.viewsApiUrl}`, newView);
          } else {
            return of(null);
          }
        }));
  }
}
