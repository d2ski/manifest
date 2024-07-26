import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManifestsListService } from './data-access/manifests-list.service';
import { AuthService } from '../auth/data-access/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../core/ui/header/header.component';

@Component({
  selector: 'app-manifests-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './manifests-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestsListComponent implements OnInit {
  private readonly authSvc = inject(AuthService);
  private readonly router = inject(Router);
  readonly user = this.authSvc.user;

  private readonly manifestsListSvc = inject(ManifestsListService);
  readonly manifestsList = this.manifestsListSvc.manifestsList;

  ngOnInit(): void {
    this.manifestsListSvc.getManifestsList();
  }

  logout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/login');
  }
}
