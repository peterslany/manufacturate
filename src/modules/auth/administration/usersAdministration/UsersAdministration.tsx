import { Box, Center, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { ReactElement, useRef, useState } from "react";
import { Button, ConfirmationDialog, ItemsList } from "../../../../components";
import { ApiUrl } from "../../../../constants";
import { useLocale, usePut } from "../../../../hooks";
import { User } from "../../../../types";
import CreateUser from "./CreateUser";

function UsersAdministration(): ReactElement {
  const { Message } = useLocale();

  const {
    isOpen: isConfirmDialogOpen,
    onOpen: onConfirmDialogOpen,
    onClose: onConfirmDialogClose,
  } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<string>();

  const { send: modifyUser } = usePut(`${ApiUrl.USERS}/${selectedUser}`);

  const handleOpenDialog = (username: string) => {
    setSelectedUser(username);
    onConfirmDialogOpen();
  };

  const itemsRef = useRef<{
    modifyItems: (modification: (current: User[]) => User[]) => void;
  }>(null);

  const modifyItems = itemsRef?.current?.modifyItems;

  const handleConfirmDialog = () => {
    onConfirmDialogClose();
    modifyUser({ isAdmin: true });

    if (modifyItems) {
      modifyItems((items) =>
        items.map((user) =>
          user.username === selectedUser ? { ...user, isAdmin: true } : user
        )
      );
    }
  };

  const onCreateCallback = (newUser: User) => {
    if (modifyItems) {
      modifyItems((items) => [...items, newUser]);
    }
  };

  return (
    <Flex mx="4" mb="8" mt="4" wrap="wrap" justifyContent="space-between">
      <Box layerStyle="dashed" w={["full", "full", "60%"]}>
        <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
          {Message.PROMOTE_TO_ADMINISTRATOR}
        </Heading>
        <ItemsList<User>
          inputRef={itemsRef}
          keyField="username"
          Item={({ username, name, isAdmin }) => (
            <Flex
              layerStyle="outline"
              key={username}
              p="2"
              px="8"
              my="2"
              justify={["space-evenly", "space-between"]}
              align="center "
            >
              <Box
                w="full"
                display="inline-block"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {" "}
                <span>
                  {username}
                  <em style={{ marginLeft: "12px" }}>{name}</em>
                </span>
              </Box>
              <Center w="115px">
                {isAdmin ? (
                  <strong>{Message.ADMINISTRATOR}</strong>
                ) : (
                  <Button
                    layerStyle="outline"
                    aria-label="Promote user to admin"
                    onClick={() => handleOpenDialog(username)}
                  >
                    {Message.PROMOTE}
                  </Button>
                )}
              </Center>
            </Flex>
          )}
          itemsEndpoint={ApiUrl.USERS}
          inputConfig={{
            name: "search by username",
            label: Message.SEARCH_BY_USERNAME,
          }}
        />
      </Box>

      <Box h="fit-content" layerStyle="dashed" w={["full", "full", "35%"]}>
        <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
          {Message.NEW_USER_ACCOUNT}
        </Heading>
        <CreateUser onCreateCallback={onCreateCallback} />
      </Box>
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={onConfirmDialogClose}
        onConfirm={handleConfirmDialog}
        header={Message.PROMOTE_TO_ADMINISTRATOR}
      >
        {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR.split("^")[0]}{" "}
        <strong>{selectedUser}</strong>
        {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR.split("^")[1]}
      </ConfirmationDialog>
    </Flex>
  );
}

export default UsersAdministration;
