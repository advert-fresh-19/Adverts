import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user.interface';

@Injectable()
export class ProfileService {

  private _userProfile: User = null;
  private isLoginUser = new BehaviorSubject(false);


  get userProfile(): User {
    return this._userProfile;
  }

  set userProfile(value: User) {
    if (Boolean(value)) {
      this._userProfile = value;
      this.isLoginUser.next(true);
    } else {
      this._userProfile = value;
      this.isLoginUser.next(false);
    }
  }

  public isUserLogged(): Observable<boolean> {
      return this.isLoginUser;
  }

  public logoutUser(): void {
    this.userProfile = null;
  }
}
