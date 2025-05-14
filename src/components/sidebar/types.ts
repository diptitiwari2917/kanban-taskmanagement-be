export type NavItem = {
  id: number;
  label: string;
  link: string;
};

export interface IFormInput {
  name: string;
}

export interface SidebarProps {
  boardId: string | null;
  setBoardId: (id: string) => void;
}
