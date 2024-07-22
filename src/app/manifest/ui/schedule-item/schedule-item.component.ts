import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent {
  timePeriod = input.required<number>();
}
