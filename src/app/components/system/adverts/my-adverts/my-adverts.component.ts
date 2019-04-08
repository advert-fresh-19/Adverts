import {Component, Input} from '@angular/core';
import {Advert} from '../../../../common/models/advert.interface';
import {AdvertService} from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-my-adverts-dump',
  templateUrl: './my-adverts.component.html',
  styleUrls: ['./my-adverts.component.scss']
})
export class MyAdvertsComponent {

  @Input() myAdvertsList: Advert[];

  @Input() removeAdvert;

  public defaultPage = 1;
  public itemsPerPage = 8;

  constructor(private advertService: AdvertService) {}

  public remove(advertId) {
    this.advertService.removeAdvert(advertId);
    this.myAdvertsList.splice(this.myAdvertsList.findIndex ((i) => {
      return i.objectId === advertId;
    }), 1);
  }
}
