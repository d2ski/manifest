import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBanknote, lucideClock, lucideSmile } from '@ng-icons/lucide';
import { ReactiveFormsModule } from '@angular/forms';
import { ManifestGoalsForm, ManifestTasksForm } from '../../data-access/models';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ lucideSmile, lucideClock, lucideBanknote })],
  templateUrl: './goals.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsComponent {
  isMicro = input<boolean>(false);
  goals = input.required<ManifestGoalsForm | ManifestTasksForm>();
  items = [
    { label: 'firstItem', icon: 'lucideClock' },
    { label: 'secondItem', icon: 'lucideSmile' },
    { label: 'thirdItem', icon: 'lucideBanknote' },
  ];
}
