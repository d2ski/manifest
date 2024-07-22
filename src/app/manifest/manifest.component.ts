import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { ScheduleItemComponent } from './ui/schedule-item/schedule-item.component';

@Component({
  selector: 'app-manifest',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ScheduleItemComponent],
  templateUrl: './manifest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent {
  private readonly startPeriod = 6;

  public readonly timePeriods = new Array(12)
    .fill(this.startPeriod)
    .map((_, idx) => this.startPeriod + idx);
}
