import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [modalData, setModalData] = useState<any>(null);

  function openModalWithData(row: any) {
    return function () {
      setIsOpen(true);
      setModalData(row || null);
    };
  }

  function closeModal() {
    setIsOpen(false);
  }

  function clearModalData() {
    setModalData(null);
  }

  function clearAndCloseModal() {
    clearModalData();
    closeModal();
  }

  return [
    isOpen,
    modalData,
    openModalWithData,
    closeModal,
    clearModalData,
    clearAndCloseModal,
  ] as const;
}
