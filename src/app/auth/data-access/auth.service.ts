import { Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<User | undefined>(undefined);
  public readonly user = this._user.asReadonly();

  async login(email: string, password: string) {
    const pb = new PocketBase(environment.baseUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authData = await pb
      .collection('users')
      .authWithPassword(email, password);

    this._user.set({
      isValid: pb.authStore.isValid,
      authModel: pb.authStore.model,
      token: pb.authStore.token,
    });

    return pb.authStore.isValid;
  }

  logout() {
    const pb = new PocketBase(environment.baseUrl);
    pb.authStore.clear();
    this.updateUser();
  }

  updateUser() {
    const pb = new PocketBase(environment.baseUrl);
    this._user.set({
      isValid: pb.authStore.isValid,
      authModel: pb.authStore.model,
      token: pb.authStore.token,
    });
  }
}
