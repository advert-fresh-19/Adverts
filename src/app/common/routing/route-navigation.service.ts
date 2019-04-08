import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AdvertService} from 'src/app/common/services/advert.service';

@Injectable()
export class RouteNavigationService {

  constructor(private router: Router, private advertService: AdvertService) {
  }

  public toAdverts(): void {
    this.router.navigate(['/adverts']);
  }

  public toNewAdvert(): void {
    this.router.navigate(['/new-advert']);
  }

  public toSignIn(): void {
    this.router.navigate(['/signin']);
  }

  public toDetailsAdvert(id: string): void {
    this.advertService.updateViewByAdvertId(id).subscribe( () => this.router.navigate([`/advert/${id}`]));
  }
}
