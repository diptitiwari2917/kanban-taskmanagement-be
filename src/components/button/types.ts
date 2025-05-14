export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}
