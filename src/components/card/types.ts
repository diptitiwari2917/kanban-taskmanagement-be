export interface CardProps {
  id: number;
  title: string;
  subtitle: string;
  onDelete: (id: number) => void;
}
