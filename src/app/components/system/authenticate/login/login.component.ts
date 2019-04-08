import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

import {User} from '../../../../common/models/user.interface';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';
import {ModalWindowService} from 'src/app/common/services/modal-window.service';
import {ProfileService} from 'src/app/common/services/profile.service';
import {UserService} from 'src/app/common/services/user.service';
import {CustomValidators} from 'src/app/common/validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public passwordControl: FormControl;
  public loginControl: FormControl;

  private subscription:  Subscription = new Subscription();

  constructor(private mws: ModalWindowService,
              private userService: UserService,
              private routeNavigationService: RouteNavigationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    this.loginControl = new FormControl();
    this.loginControl.setValidators(CustomValidators.required);
    this.passwordControl = new FormControl();
    this.passwordControl.setValidators([CustomValidators.required, CustomValidators.length(null, 6)]);
  }

  public login(): void {

    if (this.loginControl.invalid || this.passwordControl.invalid) {
      this.mws.openModalWindow(
        'Форма входа в систему',
        'Пожалуйста корректно заполните поля для входа в систему!',
        [{label: 'Ok'}]);
      return;
    }

    this.subscription = this.userService.getUserByEmailOrLogin(this.loginControl.value)
      .subscribe((user: User) => {
        if (user[0]) {
          if (user[0].password === this.passwordControl.value) {
            this.profileService.userProfile = user[0];
            this.routeNavigationService.toAdverts();
          } else {
            this.mws.openModalWindow(
              'Форма входа в систему',
              'Вы ввели не верный пароль пользователя для данной системы!',
              [{label: 'Ok'}]);
          }
        } else {
          this.mws.openModalWindow(
            'Форма входа в систему',
            'Пользователя с таким Логином или email нет в системе!',
            [{label: 'Ok'}]);
        }
      });
  }
}
