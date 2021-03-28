import { useCallback, useState } from "react";
import { Modal } from "../../../components";
import { ChangeRequestFormMode, ChangeRequestType } from "../../../constants";
import ChangeRequestForm, { ChangeRequestFormProps } from "./ChangeRequestForm";

export default function useChangeRequestFormModal(): {
  Component: () => JSX.Element;
  createFromContent: (
    contentId: string,
    contentType: ChangeRequestType
  ) => void;
  createNew: (type: ChangeRequestType) => void;
  edit: (changeRequestId: string, contentType: ChangeRequestType) => void;
} {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formProps, setFormProps] = useState<
    ChangeRequestFormProps<ChangeRequestType>
  >({
    contentType: ChangeRequestType.RATING,
    mode: ChangeRequestFormMode.CREATE_NEW,
  });

  const onClose = () => setIsModalOpen(false);

  const Component = useCallback(
    () => (
      <Modal
        {...{
          onClose,
          isOpen: isModalOpen,
          headerContent: "Formular pre vytvorenie zmeny",
          onConfirm: onClose,
        }}
        size="full"
      >
        <ChangeRequestForm {...formProps} />
      </Modal>
    ),
    [formProps, isModalOpen]
  );

  const createNew = useCallback((type: ChangeRequestType) => {
    setFormProps({
      mode: ChangeRequestFormMode.CREATE_NEW,
      contentType: type,
    });
    setIsModalOpen(true);
  }, []);

  const createFromContent = useCallback(
    (contentId: string, contentType: ChangeRequestType) => {
      setFormProps({
        mode: ChangeRequestFormMode.CREATE_FROM_CONTENT,
        contentId,
        contentType,
      });
      setIsModalOpen(true);
    },
    []
  );

  const edit = useCallback(
    (changeRequestId: string, contentType: ChangeRequestType) => {
      setFormProps({
        mode: ChangeRequestFormMode.EDIT,
        contentType,
        changeRequestId,
      });
      setIsModalOpen(true);
    },
    []
  );

  return { createNew, createFromContent, edit, Component };
}
