import { Box, Divider, Heading, useDisclosure } from "@chakra-ui/react";
import React, { ReactElement, useRef, useState } from "react";
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

  const [itemsEndpoint, setItemsEndpoint] = useState<ApiUrl | undefined>(
    ApiUrl.CHANGE_REQUESTS
  );

  const itemsRef = useRef<{
    modifyItems: (
      modification: (current: GeneralChangeRequest[]) => GeneralChangeRequest[]
    ) => void;
  }>(null);

  const modifyItems = itemsRef?.current?.modifyItems;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [dialogAction, setDialogAction] = useState<ConfirmationDialogAction>();

  const [
    selectedChangeRequest,
    setSelectedChangeRequest,
  ] = useState<GeneralChangeRequest>();

  const putUrl =
    selectedChangeRequest?.type === ContentType.RATING
      ? ApiUrl.RATINGS
      : ApiUrl.BLOGPOSTS;

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

  const { edit, Component: EditModal } = useChangeRequestFormModal(
    undefined,
    () => {
      setItemsEndpoint(undefined);
      setItemsEndpoint(ApiUrl.CHANGE_REQUESTS);
    }
  );

  const handleOpenDialog = (action: ConfirmationDialogAction) => (
    changeRequest: GeneralChangeRequest
  ) => {
    setDialogAction(action);
    setSelectedChangeRequest(changeRequest);
    onOpen();
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

  const handleConfirm = () => {
    if (dialogAction === ConfirmationDialogAction.DELETE) {
      sendDelete();
    } else {
      put({ changeRequestId: selectedChangeRequest?._id });
    }
  };

  const ChangeRequestItem = generateChangeRequestListItem(
    Boolean(admin),
    handleOpenDialog(ConfirmationDialogAction.DELETE),
    handleOpenDialog(ConfirmationDialogAction.CONFIRM),
    edit
  );

  return (
    <Box layerStyle="dashed" w="full">
      <Heading>{header}</Heading>
      <Divider my="2" />
      <ItemsList<GeneralChangeRequest>
        itemsEndpoint={itemsEndpoint}
        all={admin}
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
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        action={dialogAction}
        header={
          dialogAction === ConfirmationDialogAction.DELETE
            ? Message.DELETE
            : Message.APPROVE_CHANGE_REQUEST
        }
      >
        {dialogAction === ConfirmationDialogAction.DELETE ? (
          <>
            {Message.DIALOG_DELETE_CHANGE_REQUEST.split("^")[0]}{" "}
            {(selectedChangeRequest?.type === ContentType.RATING
              ? Message.RATING
              : Message.BLOGPOST
            ).toLowerCase()}{" "}
            <strong>{selectedChangeRequest?.content.name}</strong>
            {Message.DIALOG_DELETE_CHANGE_REQUEST.split("^")[1]}{" "}
            {selectedChangeRequest?._id}
            {Message.DIALOG_DELETE_CHANGE_REQUEST.split("^")[2]}
          </>
        ) : (
          <>
            {Message.DIALOG_APPROVE_CHANGE_REQUEST.split("^")[0]}

            <strong>{selectedChangeRequest?.content.name}</strong>
            {Message.DIALOG_APPROVE_CHANGE_REQUEST.split("^")[1]}
            <br />
            {Message.DIALOG_APPROVE_CHANGE_REQUEST.split("^")[2]}
          </>
        )}
      </ConfirmationDialog>
      <EditModal />
    </Box>
  );
}

export default ChangeRequestsList;
