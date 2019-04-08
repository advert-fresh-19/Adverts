import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Advert} from '../../../../common/models/advert.interface';
import {AdvertService} from 'src/app/common/services/advert.service';
import {ProfileService} from 'src/app/common/services/profile.service';

@Component({
  selector: 'app-my-adverts',
  template: `<app-my-adverts-dump [myAdvertsList]="myAdvertsList$ | async"></app-my-adverts-dump>`,
  styleUrls: ['./my-adverts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAdvertsContainerComponent implements OnInit {

  public defaultPage = 1;
  public itemsPerPage = 8;
  public myAdvertsList$: Observable<Advert[]>;

  constructor(private advertService: AdvertService, private profileService: ProfileService ) { }

  ngOnInit() {
    this.myAdvertsList$ = this.advertService.getAdvertsByUser(this.profileService.userProfile.objectId);
  }
}
