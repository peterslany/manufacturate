import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ProductCategories from "../../components/ProductCategories";
import { URLParamValue } from "../../types/url";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newValues: URLParamValue) => void;
  categories: URLParamValue;
}

function RatingsCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  categories,
}: Props): ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<URLParamValue>(
    categories
  );

  const modalContentBg = useColorModeValue("gray.900A10", "gray.50A10");
  const modalOverlayBg = useColorModeValue("gray.50A99", "gray.900A99");
  const cancelButtonColor = useColorModeValue("red.500", "red.300");

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      scrollBehavior="inside"
      size="sm"
      isCentered
    >
      <ModalOverlay bg={modalOverlayBg} />
      <ModalContent mx={8} layerStyle="glassLight" bgColor={modalContentBg}>
        <ModalHeader>Vyberte kategórie</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderY="1px solid" borderColor="initial">
          <ProductCategories
            {...{
              categories: selectedCategories,
              setCategories: setSelectedCategories,
            }}
          />
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-evenly">
          <Button
            layerStyle="outline"
            color={cancelButtonColor}
            mr={3}
            onClick={onClose}
          >
            Zrusit
          </Button>
          <Button
            layerStyle="outline"
            onClick={() => onConfirm(selectedCategories)}
          >
            Potvrdit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RatingsCategoryModal;
