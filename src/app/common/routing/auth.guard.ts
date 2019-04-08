import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {ProfileService} from '../services/profile.service';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public profileService: ProfileService,
              public routeNavigationService: RouteNavigationService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

      this.profileService.isUserLogged().subscribe( (logged) => {
        if (!logged) {
          this.routeNavigationService.toSignIn();
          return false;
        }
      });
    return true;
  }
}
