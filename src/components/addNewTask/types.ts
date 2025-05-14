export interface AddNewTaskProps {
  closeModal: () => void;
  loading?: boolean;
  onCreate: (data: unknown) => void;
  columns: { id: number; name: string }[]; // Adjust type as needed
  task?: boolean;
}
