import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {AdvertService} from 'src/app/common/services/advert.service';
import {ModalWindowService} from 'src/app/common/services/modal-window.service';
import {ProfileService} from 'src/app/common/services/profile.service';
import {UserService} from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnDestroy {

  @Input() isLoggedUser: boolean;
  @Input() userName: string;

  @ViewChild('profileBtn') profileBtn: ElementRef;

  public isOpenProfileMenu = false;

  private deleteUserSub: Subscription = new Subscription();

  private _outsideClickListener = (event) => this.hideOnClickOutside(event);

  constructor(private profileService: ProfileService,
              private mws: ModalWindowService,
              private advertService: AdvertService,
              private userService: UserService) {
  }

  ngOnDestroy(): void {
    this.deleteUserSub.unsubscribe();
  }

  public hideOnClickOutside(event): void {
    if (this.profileBtn && this.profileBtn.nativeElement === event.target) {
      this.isOpenProfileMenu = !this.isOpenProfileMenu;
    } else if (this.isOpenProfileMenu) {
      this.isOpenProfileMenu = false;
      document.removeEventListener('click', this._outsideClickListener);
    }
  }

  public openProfileMenu(): void {
    document.addEventListener('click', this._outsideClickListener);
  }

  public logout(): void {
    this.profileService.logoutUser();
  }

  public deleteAccount(): void {
    const dialogRef = this.mws.openModalWindow(
      'Внимание',
      'Удаление учётной записи не обратимая операция.' +
      ' При удалении учётной записи будут удалены все ваши объявления из системы.' +
      ' Вы действительно хотите удалить учётную запись?',
      [{label: 'Да', action: true}, {label: 'Нет', action: false}]);
    dialogRef.afterClosed()
      .subscribe((data) => {
          if (data) {
            this.deleteUserSub = this.userService.deleteUser(this.profileService.userProfile.objectId)
              .subscribe(() => {
                  this.advertService.removeAllAdvertsbyUser(this.profileService.userProfile.objectId);
                  // TODO: remove view data
                  this.profileService.userProfile = null;
                },
                error => console.log(error));
          } else {
            return;
          }
        }
      );
  }
}
