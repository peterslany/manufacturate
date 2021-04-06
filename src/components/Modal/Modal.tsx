import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { useLocale } from "../../hooks";
import { sizeType } from "../../types";

interface Props {
  children: ReactNode;
  headerContent: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  size?: sizeType;
}

function Modal({
  isOpen,
  onClose,
  onConfirm,
  headerContent,
  children,
  size,
}: Props): ReactElement {
  const { Message } = useLocale();

  const glass = useColorModeValue("glassLight", "glassDark");
  const modalOverlayBg = useColorModeValue("gray.50A99", "gray.900A99");
  const cancelButtonColor = useColorModeValue("red.500", "red.300");

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      scrollBehavior="inside"
      size={size}
      isCentered
    >
      <ModalOverlay bg={modalOverlayBg} />
      <ModalContent mx={8} layerStyle={glass} bgColor="none">
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderY="1px solid" borderColor="initial">
          {children}
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-evenly">
          <Button
            layerStyle="outline"
            color={cancelButtonColor}
            mr={3}
            onClick={onClose}
          >
            {Message.CANCEL}
          </Button>
          <Button layerStyle="outline" onClick={onConfirm}>
            {Message.CONFIRM}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
