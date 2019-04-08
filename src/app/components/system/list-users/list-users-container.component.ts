import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../common/models/user.interface';
import {UserService} from 'src/app/common/services/user.service';

@Component({
  selector: 'app-users',
  template: `<app-list-users-dump [userList]="userList$ | async"></app-list-users-dump>`,
  styleUrls: ['./list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsersContainerComponent implements OnInit {

  public userList$: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userList$ = this.userService.getAllUsers();
  }
}
