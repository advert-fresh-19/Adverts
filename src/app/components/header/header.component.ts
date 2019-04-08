import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ProfileService} from 'src/app/common/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isLoggedUser: boolean;
  public userName: string;

  private loggedSubscription: Subscription = new Subscription();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loggedSubscription = this.profileService.isUserLogged().subscribe( (data) => {
      this.isLoggedUser = data;
      if ( this.isLoggedUser) {
        this.userName =  this.profileService.userProfile.firstname;
      }
    });
  }

  ngOnDestroy() {
    this.loggedSubscription.unsubscribe();
  }
}
