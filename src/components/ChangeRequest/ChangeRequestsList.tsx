import { Box, Divider, Heading, useDisclosure } from "@chakra-ui/react";
import React, { ReactElement, useRef, useState } from "react";
import { Modal } from "..";
import { ApiUrl, ContentType } from "../../constants";
import { useDelete, useLocale, usePut } from "../../hooks";
import { GeneralChangeRequest } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import { ConfirmationDialogAction } from "../ConfirmationDialog/ConfirmationDialog";
import ItemsList from "../ItemsList";
import useChangeRequestFormModal from "./form/useChangeRequestFormModal";
import generateChangeRequestListItem from "./generateChangeRequestListItem";

interface Props {
  admin?: boolean;
  header: string;
}

function ChangeRequestsList({ admin, header }: Props): ReactElement {
  const { Message } = useLocale();

  const itemsRef = useRef<{
    modifyItems: (
      modification: (current: GeneralChangeRequest[]) => GeneralChangeRequest[]
    ) => void;
  }>(null);

  const modifyItems = itemsRef?.current?.modifyItems;

  const {
    isOpen: isOpenApprovalModal,
    onClose: onCloseApprovalModal,
    onOpen: onOpenApprovalModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
    onOpen: onOpenDeleteDialog,
  } = useDisclosure();

  const [
    selectedChangeRequest,
    setSelectedChangeRequest,
  ] = useState<GeneralChangeRequest>();

  const putUrl =
    selectedChangeRequest?.type === ContentType.RATING
      ? ApiUrl.RATINGS
      : ApiUrl.USERS;

  const { send: put } = usePut(
    `${putUrl}/${selectedChangeRequest?.content._id}`,
    {
      successMessage: Message.INFO_CHANGE_REQUEST_APPROVED,
      onSuccessCallback: () =>
        modifyItems &&
        modifyItems((items) =>
          items.filter((item) => item._id !== selectedChangeRequest?._id)
        ),
    }
  );

  const handleOpenApprovalModal = (changeRequest: GeneralChangeRequest) => {
    setSelectedChangeRequest(changeRequest);
    onOpenApprovalModal();
  };

  const handleConfirmApproval = () => {
    onCloseApprovalModal();
    put({ changeRequestId: selectedChangeRequest?._id });
  };

  const { edit, Component: EditModal } = useChangeRequestFormModal();

  const handleOpenDeleteDialog = (changeRequest: GeneralChangeRequest) => {
    setSelectedChangeRequest(changeRequest);
    onOpenDeleteDialog();
  };

  const { send: sendDelete } = useDelete(
    `${ApiUrl.CHANGE_REQUESTS}/${selectedChangeRequest?._id}`,
    {
      successMessage: Message.INFO_CHANGE_REQUEST_DELETED,
      onSuccessCallback: () =>
        modifyItems &&
        modifyItems((items) =>
          items.filter((item) => item._id !== selectedChangeRequest?._id)
        ),
    }
  );

  const ChangeRequestItem = generateChangeRequestListItem(
    Boolean(admin),
    handleOpenDeleteDialog,
    handleOpenApprovalModal,
    edit
  );

  return (
    <Box layerStyle="dashed" w="full">
      <Heading>{header}</Heading>
      <Divider my="2" />
      <ItemsList<GeneralChangeRequest>
        itemsEndpoint={`${ApiUrl.CHANGE_REQUESTS}${admin ? "?all=true" : ""}`}
        Item={ChangeRequestItem}
        keyField="_id"
        inputRef={itemsRef}
        inputConfig={{
          name: "Search change requests",
          label: Message.SEARCH_BY_NAME_OR_ID,
        }}
        dateSort
      />
      <ConfirmationDialog
        isOpen={isOpenDeleteDialog}
        onClose={onCloseDeleteDialog}
        onConfirm={sendDelete}
        action={ConfirmationDialogAction.DELETE}
        header="DELete?"
      >
        DELETE? {selectedChangeRequest?._id}
      </ConfirmationDialog>
      <Modal
        {...{
          onClose: onCloseApprovalModal,
          onConfirm: handleConfirmApproval,
          isOpen: isOpenApprovalModal,
          headerContent: "potvrdit",
        }}
      >
        potvridt change request s id {selectedChangeRequest?._id}
      </Modal>
      <EditModal />
    </Box>
  );
}

export default ChangeRequestsList;
