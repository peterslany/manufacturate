import { TriangleUpIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React, { ReactElement, useRef, useState } from "react";
import { Pagination, TextField } from "../../../../components";
import { ApiUrl, PAGE_SIZE } from "../../../../constants";
import { useGet, useLocale, usePut } from "../../../../hooks";
import { User } from "../../../../types";
import CreateUser from "./CreateUser";

interface Props {}

function UsersAdministration({}: Props): ReactElement {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const cancelRef = useRef(null);
  const closeDialog = () => setIsConfirmDialogOpen(false);

  const [userSearch, setUserSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<string>();

  const { data, send } = useGet<{ count: number; users: User[] }>(
    `${ApiUrl.USERS}?userSearch=${userSearch}&page=${page}`,
    { disableCache: true }
  );

  const { send: modifyUser } = usePut(`${ApiUrl.USERS}/${selectedUser}`);

  const { Message } = useLocale();

  const handleOpenDialog = (username: string) => {
    setSelectedUser(username);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    closeDialog();
    modifyUser({ isAdmin: true });
    setTimeout(() => send(), 300);
  };
  return (
    <Flex mx="4" mb="8" mt="4" wrap="wrap" justifyContent="space-between">
      <Box p="4" border="1px dashed gray" w={["full", "full", "60%"]}>
        <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
          {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR_HEADER}
        </Heading>
        <TextField
          label={Message.SEARCH_BY_USERNAME}
          onChange={setUserSearch}
          name="usernames"
          type="text"
        />
        <Divider my="4" />{" "}
        <Box>
          {data?.users.map(({ username, name, isAdmin }) => (
            <Flex
              layerStyle="outline"
              key={username}
              p="2"
              px="8"
              my="2"
              justify="space-between"
              align="center "
            >
              <span>
                {username}
                <em style={{ marginLeft: "12px" }}>{name}</em>
              </span>
              <span>
                {" "}
                {isAdmin && <strong>{Message.ADMINISTRATOR}</strong>}
                <IconButton
                  aria-label="Promote user to admin"
                  onClick={() => handleOpenDialog(username)}
                  ml="3"
                  disabled={isAdmin}
                >
                  <TriangleUpIcon />
                </IconButton>
              </span>
            </Flex>
          ))}
          <Pagination
            totalPages={Math.ceil((data?.count || 0) / PAGE_SIZE)}
            selectedPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Box>

      <Box p="4" border="1px dashed gray" w={["full", "full", "35%"]}>
        <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
          {Message.NEW_USER_ACCOUNT}
        </Heading>
        <CreateUser onCreateCallback={() => setTimeout(() => send(), 300)} />
      </Box>
      <AlertDialog
        isOpen={isConfirmDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR_HEADER}
            </AlertDialogHeader>

            <AlertDialogBody>
              {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR_BODY.split("^")[0]}{" "}
              <strong>{selectedUser}</strong>
              {Message.DIALOG_PROMOTE_TO_ADMINISTRATOR_BODY.split("^")[1]}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog}>
                {Message.CANCEL}
              </Button>
              <Button colorScheme="green" onClick={handleConfirm} ml={3}>
                {Message.CONFIRM}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default UsersAdministration;
