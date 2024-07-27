import { inject, Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import {
  Collections,
  TypedPocketBase,
  UserManifestsResponse,
} from '../../core/models/pocketbase-types';
import { AuthService } from '../../auth/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManifestsListService {
  private readonly authSvc = inject(AuthService);
  private readonly _manifestsList = signal<UserManifestsResponse[]>([]);
  manifestsList = this._manifestsList.asReadonly();

  async getManifestsList() {
    const pb = new PocketBase(environment.baseUrl) as TypedPocketBase;

    const manifestsList = await pb
      .collection(Collections.UserManifests)
      .getFullList<UserManifestsResponse>({
        fields: 'id, date, user',
        sort: '-date',
      });

    console.log(manifestsList);

    this._manifestsList.set(manifestsList);
  }

  async addNewManifest(date: string) {
    const pb = new PocketBase(environment.baseUrl) as TypedPocketBase;
    const user = pb.authStore.model?.['id'];

    if (!user) {
      return null;
    }

    const lastManifest = this.manifestsList().at(0);
    if (lastManifest && lastManifest.date === date.replace('T', ' ')) {
      return lastManifest.id;
    }

    const newManifest = await pb.collection(Collections.UserManifests).create({
      user,
      date,
    });

    this.getManifestsList();

    return newManifest.id;
  }
}
