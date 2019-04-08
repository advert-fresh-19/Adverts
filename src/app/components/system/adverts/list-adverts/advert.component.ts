import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {Advert} from '../../../../common/models/advert.interface';
import {AdvertService} from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnDestroy {

  private edvertSubscription: Subscription = new Subscription();
  private viewSubscription: Subscription = new Subscription();

  public defaultPage = 1;
  public itemsPerPage = 8;

  public advertsList: Advert[];

  constructor(private advertService: AdvertService) {

    this.edvertSubscription = this.advertService.getAllEdverts().subscribe((adverts) => {
      this.viewSubscription = this.advertService.getAllView().subscribe((view) => {
        this.advertsList = adverts.map((advert) => {
          const {count} = view.find(v => v.advert_Id === advert.objectId);
          return {...advert, count};
        });
        this.advertsList.sort((a, b) => Number(b.created) - Number(a.created));
      });
    });
  }

  ngOnDestroy(): void {
    this.edvertSubscription.unsubscribe();
    this.viewSubscription.unsubscribe();
  }


  // TODO: in developing
  public search(): void {
  }
}
