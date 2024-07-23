import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ManifestScheduleItem = FormGroup<{
  isDone: FormControl<boolean>;
  firstItem: FormControl<string>;
  secondItem: FormControl<string>;
}>;

export type ManifestGoalsItem = FormGroup<{
  goal: FormControl<string>;
}>;

export type ManifestTasksItem = FormGroup<{
  goal: FormControl<string>;
  isDone: FormControl<boolean>;
}>;

export type ManifestScheduleForm = FormGroup<{
  items: FormArray<ManifestScheduleItem>;
}>;

export type ManifestGoalsForm = FormGroup<{
  firstItem: ManifestGoalsItem;
  secondItem: ManifestGoalsItem;
  thirdItem: ManifestGoalsItem;
}>;

export type ManifestTasksForm = FormGroup<{
  firstItem: ManifestTasksItem;
  secondItem: ManifestTasksItem;
  thirdItem: ManifestTasksItem;
}>;

export type ManifestForm = FormGroup<{
  date: FormControl<string>;
  goals: ManifestGoalsForm;
  milestones: ManifestGoalsForm;
  tasks: ManifestTasksForm;
  schedule: ManifestScheduleForm;
}>;
