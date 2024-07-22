import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBanknote, lucideClock, lucideSmile } from '@ng-icons/lucide';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ lucideSmile, lucideClock, lucideBanknote })],
  templateUrl: './goals.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsComponent {
  isMicro = input<boolean>(false);

  icons = ['lucideClock', 'lucideSmile', 'lucideBanknote'];
}
