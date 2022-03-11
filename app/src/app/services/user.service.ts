import { newUsers } from '@app/_actions/user.action';
import { fetchUsers } from '@app/_actions/user.action';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  fetchUsers() {
    return fetchUsers();
  }
  saveUser(user: any) {
    return newUsers(user);
  }
}
