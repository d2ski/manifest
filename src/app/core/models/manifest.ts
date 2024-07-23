type GoalsItem = {
  goal: string;
};

type TasksItem = {
  goal: string;
  isDone: boolean;
};

type ScheduleItem = {
  isDone: boolean;
  firstItem: string;
  secondItem: string;
};

type Goals = {
  firstItem: GoalsItem;
  secondItem: GoalsItem;
  thirdItem: GoalsItem;
};

type Tasks = {
  firstItem: TasksItem;
  secondItem: TasksItem;
  thirdItem: TasksItem;
};

type Schedule = {
  items: ScheduleItem[];
};

export type Manifest = {
  date: string;
  goals: Goals;
  milestones: Goals;
  tasks: Tasks;
  schedule: Schedule;
};
