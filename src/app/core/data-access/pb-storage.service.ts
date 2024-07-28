import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Manifest } from '../models/manifest';
import { environment } from '../../../environments/environment';
import {
  TypedPocketBase,
  Collections,
  UserManifestsResponse,
} from '../models/pocketbase-types';

@Injectable({
  providedIn: 'root',
})
export class PbStorageService {
  public async getManifest(id: string): Promise<Manifest | null> {
    console.log('getManifest service');

    const pb = new PocketBase(environment.baseUrl) as TypedPocketBase;

    try {
      const { data } = await pb
        .collection(Collections.UserManifests)
        .getOne<UserManifestsResponse<Manifest>>(id);

      if (!data) {
        return null;
      }

      const { date, goals, tasks, milestones, schedule } = data;

      const manifest: Manifest = {
        date,
        goals,
        tasks,
        milestones,
        schedule,
      };

      return manifest;
    } catch (e) {
      // No such manifest
      return null;
    }
  }

  public async saveManifest(manifestId: string, manifest: Manifest) {
    console.log('saveManifest service');

    const pb = new PocketBase(environment.baseUrl) as TypedPocketBase;

    try {
      const response = await await pb
        .collection(Collections.UserManifests)
        .update(manifestId, { data: manifest });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}
