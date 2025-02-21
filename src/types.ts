export type Status = 'Done' | 'In progress' | 'To do';
export type Priority = 'Low' | 'Medium' | 'High';

export interface TableRow {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  startDate: string;
  deadline: string;
}
