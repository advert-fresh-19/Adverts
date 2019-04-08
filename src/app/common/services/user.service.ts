import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/internal/operators';

import {User} from '../models/user.interface';

@Injectable()
export class UserService {

  private baseApiUrl = 'https://api.backendless.com/C60E23B4-0E9D-2339-FF1A-FB80040F5F00/D20CC1CF-0C67-3926-FF2E-1D07982B9400/data';
  private usersApiUrl = '/list_users';

  constructor(private http: HttpClient) {}


  getAllUsers():  Observable<User[]> {
    return this.http.get<User[]>(`https://api.backendless.com/C60E23B4-0E9D-2339-FF1A-FB80040F5F00/D20CC1CF-0C67-3926-FF2E-1D07982B9400/data/list_users?pageSize=100`);
  }

  getUserByEmailOrLogin(value: string): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}${this.usersApiUrl}?where=email='${value}'||login='${value}'`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseApiUrl}${this.usersApiUrl}?where=email='${email}'`)
      .pipe(
        map((users) => users.length ? users[0] : null)
      );
  }

  getUserByLogin(login: string): any {
    return this.http.get<User[]>(`${this.baseApiUrl}${this.usersApiUrl}?where=login='${login}'`)
      .pipe(
        map((users) => users.length ? users[0] : null)
      );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseApiUrl}${this.usersApiUrl}?where=objectId='${userId}'`).pipe( map(([user]) => user ));
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}${this.usersApiUrl}`, user);
  }

  changeUserData(userId: string, userData): Observable<User> {
    return this.http.put<User>(`${this.baseApiUrl}${this.usersApiUrl}/${userId}`, userData)
      .pipe(
        mergeMap((user) => {
          if (user) {
            return of(user);
          }
          return of(null);
        }),
      );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<boolean>(`${this.baseApiUrl}${this.usersApiUrl}/${userId}`);
  }
}
