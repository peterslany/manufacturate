import { useCallback, useRef, useState } from "react";
import { ChangeRequestFormMode, ContentType } from "../../../constants";
import Modal from "../../Modal";
import ChangeRequestForm, { ChangeRequestFormProps } from "./ChangeRequestForm";

export default function useChangeRequestFormModal(
  onCreateCallback?: () => void
): {
  Component: () => JSX.Element;
  createFromContent: (contentId: string, contentType: ContentType) => void;
  createNew: (type: ContentType) => void;
  edit: (changeRequestId: string, contentType: ContentType) => void;
} {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitRef = useRef<HTMLButtonElement>(null);

  const [formProps, setFormProps] = useState<
    ChangeRequestFormProps<ContentType>
  >({
    contentType: ContentType.RATING,
    mode: ChangeRequestFormMode.CREATE_NEW,
  });

  const onClose = () => setIsModalOpen(false);

  const onSuccessCallback = useCallback(() => {
    onClose();
    if (formProps.mode !== ChangeRequestFormMode.EDIT && onCreateCallback) {
      onCreateCallback();
    }
  }, [formProps.mode, onCreateCallback]);

  const Component = useCallback(
    () => (
      <Modal
        {...{
          onClose,
          isOpen: isModalOpen,
          headerContent: "Formular pre vytvorenie zmeny",
          onConfirm: () => submitRef?.current?.click(),
        }}
        size="full"
      >
        <ChangeRequestForm<typeof formProps.contentType>
          {...formProps}
          submitRef={submitRef}
          onSuccessCallback={onSuccessCallback}
        />
      </Modal>
    ),
    [formProps, isModalOpen, onSuccessCallback]
  );

  const createNew = useCallback((type: ContentType) => {
    setFormProps({
      mode: ChangeRequestFormMode.CREATE_NEW,
      contentType: type,
    });
    setIsModalOpen(true);
  }, []);

  const createFromContent = useCallback(
    (contentId: string, contentType: ContentType) => {
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
    (changeRequestId: string, contentType: ContentType) => {
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
