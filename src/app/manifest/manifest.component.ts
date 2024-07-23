import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { ScheduleItemComponent } from './ui/schedule-item/schedule-item.component';
import { GoalsComponent } from './ui/goals/goals.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ManifestForm } from './data-access/models';

@Component({
  selector: 'app-manifest',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    ScheduleItemComponent,
    GoalsComponent,
  ],
  templateUrl: './manifest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly startPeriod = 6;
  public readonly timePeriods = new Array(12)
    .fill(this.startPeriod)
    .map((_, idx) => this.startPeriod + idx);
  private readonly scheduleItemsControls = this.timePeriods.map((_period) => {
    return this.fb.group({
      isDone: this.fb.nonNullable.control(false),
      firstItem: this.fb.nonNullable.control(`${_period}`),
      secondItem: this.fb.nonNullable.control(`${_period + 1}`),
    });
  });

  readonly manifestForm: ManifestForm = this.fb.group({
    date: this.fb.nonNullable.control<string>(new Date().toLocaleDateString()),
    goals: this.fb.group({
      firstItem: this.fb.group({ goal: this.fb.nonNullable.control('Цель 1') }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control('Цель 2'),
      }),
      thirdItem: this.fb.group({ goal: this.fb.nonNullable.control('Цель 3') }),
    }),
    milestones: this.fb.group({
      firstItem: this.fb.group({
        goal: this.fb.nonNullable.control('Достижение 1'),
      }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control('Достижение 2'),
      }),
      thirdItem: this.fb.group({
        goal: this.fb.nonNullable.control('Достижение 3'),
      }),
    }),
    tasks: this.fb.group({
      firstItem: this.fb.group({
        goal: this.fb.nonNullable.control('Задача 1'),
        isDone: this.fb.nonNullable.control(false),
      }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control('Задача 2'),
        isDone: this.fb.nonNullable.control(false),
      }),
      thirdItem: this.fb.group({
        goal: this.fb.nonNullable.control('Задача 3'),
        isDone: this.fb.nonNullable.control(false),
      }),
    }),
    schedule: this.fb.group({
      items: this.fb.array(this.scheduleItemsControls),
    }),
  });

  ngOnInit(): void {
    this.manifestForm.valueChanges.subscribe((values) => console.log(values));
  }
}
