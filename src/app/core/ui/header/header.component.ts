import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/data-access/models/user';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user = input<User | undefined>();
  readonly logout = output<void>();
}
