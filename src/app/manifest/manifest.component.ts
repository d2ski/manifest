import {
  afterRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { ScheduleItemComponent } from './ui/schedule-item/schedule-item.component';
import { GoalsComponent } from './ui/goals/goals.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ManifestForm } from './data-access/models';
import { ManifestService } from './data-access/manifest.service';
import { Manifest } from '../core/models/manifest';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  private readonly manifestSvc = inject(ManifestService);
  private readonly fb = inject(FormBuilder);

  private readonly manifest = this.manifestSvc.manifest;

  private readonly startPeriod = 6;
  public readonly timePeriods = new Array(12)
    .fill(this.startPeriod)
    .map((_, idx) => this.startPeriod + idx);
  private readonly scheduleItemsControls = this.timePeriods.map(() => {
    return this.fb.group({
      isDone: this.fb.nonNullable.control(false),
      firstItem: this.fb.nonNullable.control(''),
      secondItem: this.fb.nonNullable.control(''),
    });
  });

  readonly manifestForm: ManifestForm = this.fb.group({
    date: this.fb.nonNullable.control<string>(new Date().toLocaleDateString()),
    goals: this.fb.group({
      firstItem: this.fb.group({ goal: this.fb.nonNullable.control('') }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
      }),
      thirdItem: this.fb.group({ goal: this.fb.nonNullable.control('') }),
    }),
    milestones: this.fb.group({
      firstItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
      }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
      }),
      thirdItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
      }),
    }),
    tasks: this.fb.group({
      firstItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
        isDone: this.fb.nonNullable.control(false),
      }),
      secondItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
        isDone: this.fb.nonNullable.control(false),
      }),
      thirdItem: this.fb.group({
        goal: this.fb.nonNullable.control(''),
        isDone: this.fb.nonNullable.control(false),
      }),
    }),
    schedule: this.fb.group({
      items: this.fb.array(this.scheduleItemsControls),
    }),
  });

  constructor() {
    afterRender(() => {
      if (!this.manifest()) {
        this.manifestSvc.loadManifest();
        const manifest = this.manifest();

        if (manifest) {
          this.manifestForm.patchValue(manifest);
        }
      }
    });

    effect(() => {
      const manifest = this.manifest();
      if (manifest) {
        this.manifestSvc.saveManifest();
      }
    });
  }

  ngOnInit(): void {
    this.manifestForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((manifest) =>
        this.manifestSvc.setManifest(manifest as Manifest)
      );
  }
}
