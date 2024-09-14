import { Task as GanttTask } from 'dhtmlx-gantt';

export interface ExtendedTask extends GanttTask {
  poleName?: string;
  ressource?: string;
  personnes?: number[];
}