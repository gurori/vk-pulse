export interface Task {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  score: number;
  startDate: string; // ISO строки для фронта
  endDate: string;
  actualStartDate: string;
  actualEndDate: string;
  receiver?: User | null;
}

export interface Team {
  id: string;
  name: string;
  users: User[];
  tasks: Task[];
  adminId?: string | null;
}

export interface User {
  id: string;
  role: string;
  email: string;
  name: string;
  score: number;
  team?: Team | null;
  position?: Position | null;
  completedTasks: Task[];
  inProcessTasks: Task[];
}

export interface Position {
  id: string;
  name: string;
  description: string;
  salary: number;
}
