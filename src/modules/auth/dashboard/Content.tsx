import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { Button } from "../../../components";
import useChangeRequestFormModal from "../../../components/ChangeRequest/form/useChangeRequestFormModal";
import { contentTypeApiUrl } from "../../../components/ChangeRequest/form/utils";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { ConfirmationDialogAction } from "../../../components/ConfirmationDialog/ConfirmationDialog";
import ItemsList from "../../../components/ItemsList";
import { ApiUrl, ContentType, Path } from "../../../constants";
import { useColorVariations, useDelete, useLocale } from "../../../hooks";
import { BasicRating, BlogpostBase } from "../../../types";
import { formatDateShort } from "../../../utils";
import { withLink } from "../../../wrappers";

interface Props {
  setChangeRequestsCount: (
    set: (newCount: number | undefined) => number
  ) => void;
  type: ContentType;
}

function OverviewRatings<T extends BasicRating | BlogpostBase>({
  type,
  setChangeRequestsCount,
}: Props): ReactElement {
  const { Message, locale } = useLocale();

  const [session] = useSession();

  const [selectedItem, setSelectedItem] = useState<T>();

  const isRating = type === ContentType.RATING;

  const itemsRef = useRef<{
    modifyItems: (modification: (current: T[]) => T[]) => void;
  }>(null);

  const modifyItems = itemsRef?.current?.modifyItems;

  const {
    isOpen: isOpenDeleteDialog,
    onOpen: onOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
  } = useDisclosure();

  const { send: deleteContent } = useDelete(
    `${isRating ? ApiUrl.RATINGS : ApiUrl.BLOGPOSTS}/${selectedItem?._id}`,
    { successMessage: Message.INFO_CONTENT_REVERTED }
  );

  const handleOpenDeleteDialog = (item: T) => {
    setSelectedItem(item);
    onOpenDeleteDialog();
  };

  const incrementChangeRequestCount = useCallback(
    () => setChangeRequestsCount((prev) => (prev || 0) + 1),
    [setChangeRequestsCount]
  );

  const handleConfirmDelete = () => {
    deleteContent();
    onCloseDeleteDialog();
    if (modifyItems) {
      modifyItems((items) =>
        items.filter((item) => item._id !== selectedItem?._id)
      );
    }
    incrementChangeRequestCount();
  };

  const { createNew, createFromContent, Component } = useChangeRequestFormModal(
    incrementChangeRequestCount
  );

  const [red, blue, gray] = useColorVariations(["red", "blue", "gray"]);

  const Item = (props: T) => {
    const { _id, name, date } = props;

    const LinkButton = withLink(() => (
      <Center
        layerStyle="outline"
        aria-label="Approve change request"
        color={gray.fg}
        w="40px"
        h="40px"
        transition="all 200ms ease-in-out"
        _groupHover={{
          background: gray.fg,
          color: gray.bg,
          borderColor: gray.fg,
        }}
      >
        <ViewIcon />
      </Center>
    ));
    return (
      <Flex
        p="4"
        layerStyle="outline"
        justifyContent="space-between"
        align="center"
        direction={["column", "row"]}
        mb="2"
      >
        <Flex
          px="2"
          w="full"
          justifyContent="space-between"
          wrap={["wrap", "nowrap"]}
          align="center"
        >
          <Text fontWeight="600" w={["full", "50%"]} my="2">
            {name}
          </Text>{" "}
          <Text
            textAlign="right"
            w={["auto", "13%"]}
            minW={["auto", "80px"]}
            mr="2"
            mb={["2", 0]}
          >
            {formatDateShort(date, locale)}
          </Text>
        </Flex>
        <Flex
          minW={session?.user.isAdmin ? "160px" : "100px"}
          justify="space-between"
        >
          {session?.user.isAdmin && (
            <IconButton
              aria-label={`Delete ${type}`}
              onClick={() => handleOpenDeleteDialog(props)}
              color={red.fg}
              _hover={{
                background: red.fg,
                color: gray.bg,
                borderColor: red.fg,
              }}
              layerStyle="outline"
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Create change request from this content"
            onClick={() => createFromContent(_id, type)}
            color={blue.fg}
            _hover={{
              background: blue.fg,
              color: gray.bg,
              borderColor: blue.fg,
            }}
            layerStyle="outline"
          >
            <EditIcon />
          </IconButton>
          <LinkButton
            href={
              isRating
                ? `${Path.RATINGS}/${_id}`
                : `${Path.BLOG}/${(props as BlogpostBase).urlPathSegment}`
            }
            linkText="Redirect to content"
            target="_blank"
          />
        </Flex>
      </Flex>
    );
  };
  return (
    <Box p="4">
      <Flex justifyContent="space-between" align="center" mb="2">
        <Heading>{isRating ? Message.RATINGS : Message.BLOG}</Heading>
        <Button layerStyle="outline" onClick={() => createNew(type)}>
          <AddIcon mr="2" /> {Message.CREATE}
        </Button>
      </Flex>
      <Box layerStyle="dashed">
        <ItemsList<T>
          itemsEndpoint={contentTypeApiUrl(type)}
          Item={Item}
          keyField="_id"
          inputConfig={{
            name: `Search for ${type}`,
            label: isRating
              ? Message.SEARCH_BY_NAME
              : Message.SEARCH_BY_NAME_OR_CONTENT,
          }}
          inputRef={itemsRef}
          dateSort
        />
      </Box>
      <Component />
      <ConfirmationDialog
        action={ConfirmationDialogAction.DELETE}
        onClose={onCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isOpen={isOpenDeleteDialog}
        header={Message.DELETE}
      >
        {Message.DIALOG_DELETE_CONTENT.split("^")[0]}
        {(isRating ? Message.RATING : Message.BLOGPOST).toLowerCase()}{" "}
        {selectedItem?.name} {Message.DIALOG_DELETE_CONTENT.split("^")[1]}
        <br />
        {Message.DIALOG_DELETE_CONTENT.split("^")[2]}
        <strong>{Message.DIALOG_DELETE_CONTENT.split("^")[3]}</strong>
        {Message.DIALOG_DELETE_CONTENT.split("^")[4]}
        {(isRating ? Message.RATING : Message.BLOGPOST).toLowerCase()}
        {Message.DIALOG_DELETE_CONTENT.split("^")[5]}
      </ConfirmationDialog>
    </Box>
  );
}

export default OverviewRatings;
