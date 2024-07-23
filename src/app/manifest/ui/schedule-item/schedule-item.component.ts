import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManifestScheduleItem } from '../../data-access/models';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent {
  timePeriod = input.required<number>();
  scheduleItem = input.required<ManifestScheduleItem>();
}
