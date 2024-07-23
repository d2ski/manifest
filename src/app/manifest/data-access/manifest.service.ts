import { inject, Injectable, signal } from '@angular/core';
import { Manifest } from '../../core/models/manifest';
import { LocalStorageService } from '../../core/data-access/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ManifestService {
  public manifest = signal<Manifest | null>(null);
  private readonly storage = inject(LocalStorageService);

  public loadManifest() {
    this.manifest.set(this.storage.getManifest());
  }

  public saveManifest() {
    const manifest = this.manifest();

    if (manifest) {
      this.storage.saveManifest(manifest);
    }
  }

  public setManifest(manifest: Manifest) {
    this.manifest.set(manifest);
  }
}
