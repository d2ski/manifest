import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from './local-storage.provider';
import { Manifest } from '../models/manifest';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly storage = inject(LOCAL_STORAGE);

  public getManifest(): Manifest | null {
    if (!this.storage) return null;

    const manifest = this.storage.getItem('manifest');
    if (manifest) {
      return JSON.parse(manifest) as Manifest;
    }

    return null;
  }

  public saveManifest(manifest: Manifest): void {
    if (!this.storage) return;
    this.storage.setItem('manifest', JSON.stringify(manifest));
  }
}
