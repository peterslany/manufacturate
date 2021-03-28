import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { ReactElement, useState } from "react";
import { Button } from "../../../components";
import { ChangeRequestType } from "../../../constants";
import { useLocale } from "../../../hooks";
import withAuth from "../withAuth";
import useChangeRequestFormModal from "./useChangeRequestFormModal";
import UsersAdministration from "./usersAdministration/UsersAdministration";

interface Props {}

function Dashboard({}: Props): ReactElement {
  const { Message } = useLocale();
  const [session, loading] = useSession();

  const isAdmin = session?.user.isAdmin;

  const [showUsersAdministration, setShowUsersAdministration] = useState(false);
  const [showChangeRequestApproval, setShowChangeRequestApproval] = useState(
    false
  );

  const {
    edit,
    createFromContent,
    createNew,
    Component,
  } = useChangeRequestFormModal();

  return (
    <Box mx={[2, 4, 8]} mt={[2, 4, 6]}>
      <Alert my="4" status="warning" fontSize="lg">
        <AlertIcon />
        {Message.ALERT_CHANGE_REQUESTS_WAITING}( 7 ).
      </Alert>
      <Heading>
        {Message.WELCOME}, {session?.user.username}
      </Heading>
      <Divider />
      <Text>
        Tu môžeš vytvárať a upravovať hodnotenia a blogy
        {isAdmin && ", spravovať užívateľov a schvaľovať zmeny"}.
      </Text>
      Moje zmeny ...
      <Button onClick={() => createNew(ChangeRequestType.RATING)}>
        NOVY CHANGE REQUEST
      </Button>
      <Button
        onClick={() =>
          edit("6060f86d6a6c91b598846b4f", ChangeRequestType.RATING)
        }
      >
        UPRAVIT CHANGE REQUEST
      </Button>
      <br /> {/* todo: remove br later */}
      {/* TODO: put into it's own component and complete  */}
      {isAdmin && (
        <>
          <Box w="full" layerStyle="outline">
            <Flex
              justifyContent="space-between"
              cursor="pointer"
              p="4"
              _hover={{ fontWeight: 600, textDecoration: "underline" }}
              onClick={() => setShowUsersAdministration((prev) => !prev)}
            >
              {Message.USERS_ADMINISTRATION}
              <ChevronDownIcon
                fontSize="xl"
                {...(showUsersAdministration && {
                  transform: "rotate(180deg)",
                })}
              />
            </Flex>

            <Collapse in={showUsersAdministration} animateOpacity>
              <Divider />
              <UsersAdministration />
            </Collapse>
          </Box>
        </>
      )}
      {/* <ChangeRequestForm
        contentType={ChangeRequestType.RATING}
        mode={ChangeRequestFormMode.EDIT}
        changeRequestId="606095f3739490e89038590f"
      /> */}
      {/* <Modal /> */}
      <Component />
    </Box>
  );
}

export default withAuth(Dashboard);
