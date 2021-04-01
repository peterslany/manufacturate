import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode, useRef } from "react";
import { useLocale } from "../../hooks";

export enum ConfirmationDialogAction {
  CONFIRM = "confirm",
  DELETE = "delete",
}

interface Props {
  action?: ConfirmationDialogAction;
  children: ReactNode;
  header: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  header,
  children,
  action = ConfirmationDialogAction.CONFIRM,
}: Props): ReactElement {
  const { Message } = useLocale();

  const cancelRef = useRef(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {Message.CANCEL}
            </Button>
            <Button
              colorScheme={
                action === ConfirmationDialogAction.CONFIRM ? "green" : "red"
              }
              onClick={handleConfirm}
              ml={3}
            >
              {action === ConfirmationDialogAction.CONFIRM
                ? Message.CONFIRM
                : Message.DELETE}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmationDialog;
