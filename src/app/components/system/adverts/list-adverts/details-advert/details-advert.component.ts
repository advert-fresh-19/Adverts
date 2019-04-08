import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdvertService} from 'src/app/common/services/advert.service';
import {UserService} from 'src/app/common/services/user.service';
import {Advert} from '../../../../../common/models/advert.interface';
import {User} from '../../../../../common/models/user.interface';

@Component({
  selector: 'app-details-advert',
  templateUrl: './details-advert.component.html',
  styleUrls: ['./details-advert.component.scss']
})
export class DetailsAdvertComponent implements OnInit {

  public selectAdvert: Advert;
  public advertCreator: User;

  constructor(private route: ActivatedRoute,
              private advertService: AdvertService,
              private userService: UserService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.advertService.getAdvertById(id).subscribe( (advert: Advert) => {
      this.selectAdvert = advert;
      this.userService.getUserById(this.selectAdvert.user_id).subscribe( (user) => {
        this.advertCreator = user;
      });
    });
  }
}
