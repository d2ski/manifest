import { Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import {
  Collections,
  ManifestsRecord,
  TypedPocketBase,
} from '../../core/models/pocketbase-types';

@Injectable({
  providedIn: 'root',
})
export class ManifestsListService {
  private readonly _manifestsList = signal<ManifestsRecord[]>([]);
  manifestsList = this._manifestsList.asReadonly();

  async getManifestsList() {
    const pb = new PocketBase(environment.baseUrl) as TypedPocketBase;

    const manifestsList = await pb
      .collection(Collections.Manifests)
      .getFullList<ManifestsRecord>({ sort: '-date' });

    console.log(manifestsList);

    this._manifestsList.set(manifestsList);
  }
}
