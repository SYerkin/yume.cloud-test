export interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  taskDueDate?: string;
  taskStatus: 'to-do' | 'active' | 'done';
  taskSubtasks: Subtask[];
}

export interface Subtask {
  subtaskParentId: string;
  subtaskId: string;
  subtaskTitle: string;
  subtaskStatus: boolean;
}