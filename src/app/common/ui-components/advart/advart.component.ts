import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';
import {AdvertService} from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-advart',
  templateUrl: './advart.component.html',
  styleUrls: ['./advart.component.scss']
})
export class CAdvartComponent implements OnInit {

  @Input() editable = false;
  @Input() dataAdvert;

  @Output() public removeAdvert: EventEmitter<any> = new EventEmitter();

  constructor(private routeNavigationService: RouteNavigationService, private advertService: AdvertService) { }

  ngOnInit() {
  }

  toAdvertDetails() {
    this.routeNavigationService.toDetailsAdvert(this.dataAdvert.objectId);
  }

  public removeAction(advertId) {
    this.removeAdvert.next(advertId);
  }
}
