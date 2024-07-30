import { effect, inject, Injectable, signal } from '@angular/core';
import { Manifest } from '../../core/models/manifest';
import { PbStorageService } from '../../core/data-access/pb-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ManifestService {
  private readonly _manifestId = signal<string | null>(null);
  public readonly manifestId = this._manifestId.asReadonly();

  private readonly _manifest = signal<Manifest | null>(null);
  public readonly manifest = this._manifest.asReadonly();

  private readonly storage = inject(PbStorageService);

  constructor() {
    effect(async () => {
      const manifestId = this._manifestId();
      if (manifestId) {
        await this.loadManifest(manifestId);
      }
    });
  }

  private async loadManifest(manifestId: string) {
    const manifest = await this.storage.getManifest(manifestId);

    if (manifest) {
      this.setManifest(manifest, true);
    }
  }

  private async saveManifest() {
    const manifest = this._manifest();
    const manifestId = this._manifestId();

    if (manifest && manifestId) {
      this.storage.saveManifest(manifestId, manifest);
    }
  }

  public setManifestId(manifestId: string) {
    this._manifestId.set(manifestId);
  }

  public setManifest(manifest: Manifest, isInitialLoad: boolean) {
    this._manifest.set(manifest);

    if (!isInitialLoad) {
      this.saveManifest();
    }
  }
}
