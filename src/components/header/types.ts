export interface Column {
  id: number;
  name: string;
}

export interface HeaderProps {
  boardId: string | undefined;
  fetchTasks: () => Promise<void>;
  columns: Column[];
}
