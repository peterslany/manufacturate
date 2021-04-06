import { useCallback, useRef, useState } from "react";
import { ChangeRequestFormMode, ContentType } from "../../../constants";
import { useLocale } from "../../../hooks";
import Modal from "../../Modal";
import ChangeRequestForm, { ChangeRequestFormProps } from "./ChangeRequestForm";

export default function useChangeRequestFormModal(
  onCreateCallback?: () => void,
  onEditCallback?: () => void
): {
  Component: () => JSX.Element;
  createFromContent: (contentId: string, contentType: ContentType) => void;
  createNew: (type: ContentType) => void;
  edit: (changeRequestId: string, contentType: ContentType) => void;
} {
  const { Message } = useLocale();

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
    } else if (onEditCallback) {
      onEditCallback();
    }
  }, [formProps.mode, onCreateCallback, onEditCallback]);

  const Component = useCallback(
    () => (
      <Modal
        {...{
          onClose,
          isOpen: isModalOpen,
          headerContent: Message.CHANGE_REQUEST,
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
    [Message.CHANGE_REQUEST, formProps, isModalOpen, onSuccessCallback]
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
