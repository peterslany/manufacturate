import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { isString } from "lodash";
import React, { ReactElement, useRef, useState } from "react";
import { allProductCategoriesFlattened } from "../../../constants";
import { useLocale } from "../../../hooks";
import { getProductCategoryLabel } from "../../../utils";

interface Props {
  setSubCategories: React.Dispatch<React.SetStateAction<string[]>>;
  subCategories: string[];
}

function RatingFormSubCategoryPicker({
  subCategories,
  setSubCategories,
}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();

  const [deleteDialogItem, setDeleteDialogItem] = useState<string | null>(null);

  const closeDeleteDialog = () => setDeleteDialogItem(null);

  const cancelRef = useRef(null);

  const handleSubCategoriesSelectionChange = (
    newValue: string | string[] | undefined
  ) => {
    if (isString(newValue)) {
      setSubCategories([newValue]);
    } else {
      setSubCategories(newValue || []);
    }
  };

  const handleDeleteConfirm = (categoryName: string) => {
    setSubCategories((previous) =>
      previous.filter((category) => categoryName !== category)
    );
    setDeleteDialogItem(null);
  };

  return (
    <Flex
      layerStyle="outline"
      borderWidth="3px"
      wrap="wrap"
      p="4"
      m="4"
      align="center"
      w="fit-content"
    >
      <Menu placement="auto" isLazy closeOnSelect={false}>
        <MenuButton as={Button} layerStyle="outline">
          {Message.CHOOSE_SUBCATEGORIES}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            value={subCategories}
            onChange={handleSubCategoriesSelectionChange}
            type="checkbox"
          >
            {allProductCategoriesFlattened
              .filter(({ value }) => !subCategories.includes(value))
              .map(({ value, label }) => (
                <MenuItemOption key={value} value={value}>
                  {localizeMessage(label)}
                </MenuItemOption>
              ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={Boolean(deleteDialogItem)}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {Message.DELETE_SUBCATEGORY}
            </AlertDialogHeader>

            <AlertDialogBody>
              {Message.DIALOG_DELETE_SUBCATEGORY.split("^")[0]}{" "}
              <strong>
                {deleteDialogItem &&
                  localizeMessage(getProductCategoryLabel(deleteDialogItem))}
              </strong>{" "}
              {Message.DIALOG_DELETE_SUBCATEGORY.split("^")[1]}
              <br /> <br />
              {Message.DIALOG_DELETE_SUBCATEGORY.split("^")[2]}
              <strong>{Message.DIALOG_DELETE_SUBCATEGORY.split("^")[3]}</strong>
              {Message.DIALOG_DELETE_SUBCATEGORY.split("^")[4]}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                {Message.CANCEL}
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  deleteDialogItem && handleDeleteConfirm(deleteDialogItem)
                }
                ml={3}
              >
                {Message.DELETE}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {subCategories.map((categoryName) => (
        <Tag
          key={categoryName}
          m="2"
          size="md"
          bg="transparent"
          color="inherit"
          variant="outline"
          borderRadius="16px"
        >
          <TagLabel>
            {localizeMessage(getProductCategoryLabel(categoryName))}
          </TagLabel>
          <TagCloseButton onClick={() => setDeleteDialogItem(categoryName)} />
        </Tag>
      ))}
    </Flex>
  );
}

export default RatingFormSubCategoryPicker;
