import {Component, Input} from '@angular/core';

import {User} from '../../../common/models/user.interface';

@Component({
  selector: 'app-list-users-dump',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  @Input() public userList: User[];
}
