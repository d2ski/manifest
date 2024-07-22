import { FormControl, FormGroup } from '@angular/forms';

export type ManifestScheduleItem = FormGroup<{
  isDone: FormControl<boolean>;
  primaryData: FormControl<string>;
  secondaryData: FormControl<string>;
}>;

export type ManifestGoalsItem = FormGroup<{
  goal: FormControl<string>;
}>;

export type ManifestTasksItem = FormGroup<{
  goal: FormControl<string>;
  isDone: FormControl<boolean>;
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
}>;
