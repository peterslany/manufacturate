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
import { useLocale } from "../../../hooks";
import withAuth from "../withAuth";
import RatingForm from "./RatingForm";
import UsersAdministration from "./usersAdministration/UsersAdministration";

interface Props {}

function Dashboard({}: Props): ReactElement {
  const { Message } = useLocale();
  const [session, loading] = useSession();

  const isAdmin = session?.user.isAdmin;

  const [showUsersAdministration, setShowUsersAdministration] = useState(false);
  // const [showRatingApproval, setShowRatingApproval] = useState(false);

  return (
    <Box mx={[2, 4, 8]} mt={[2, 4, 6]}>
      <Alert my="4" status="warning" fontSize="lg">
        <AlertIcon />V -=49496systéme je 7 zmien čakajúcich na schválenie.
      </Alert>
      <Heading>
        {Message.WELCOME}, {session?.user.username}
      </Heading>
      <Divider />
      <Text>
        Tu môžeš vytvárať a upravovať hodnotenia a blogy
        {isAdmin && ", spravovať užívateľov a schvaľovať zmeny"}.
      </Text>
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
      <RatingForm />
    </Box>
  );
}

export default withAuth(Dashboard);
