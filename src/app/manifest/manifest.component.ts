import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manifest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manifest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent {}
