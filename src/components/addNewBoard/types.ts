export interface ModalProps {
  closeModal: () => void;
  loading?: boolean;
  onCreate: (data: { name: string }) => void;
}
