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
import { Button, TextField } from "components";
import { useSession } from "next-auth/client";
import React, { ReactElement, useState } from "react";
import withAuth from "../withAuth";

interface Props {}

function Dashboard({}: Props): ReactElement {
  const [session, loading] = useSession();

  const isAdmin = session?.user.isAdmin;

  const [showUserAdministration, setShowUserAdministration] = useState(false);
  const [showRatingApproval, setShowRatingApproval] = useState(false);

  return (
    <Box mx={[2, 4, 8]} mt={[2, 4, 6]}>
      <Alert status="warning" fontSize="lg">
        <AlertIcon />V systéme je 7 zmien čakajúcich na schválenie.
      </Alert>
      <Heading>Vitaj, {session?.user.name}</Heading>
      <Divider />
      <Text>
        V tejto sekcii môžeš vytvárať a upravovať hodnotenia
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
              onClick={() => setShowUserAdministration((prev) => !prev)}
            >
              Správa užívateľov
              <ChevronDownIcon
                fontSize="xl"
                {...(showUserAdministration && { transform: "rotate(180deg)" })}
              />
            </Flex>

            <Collapse in={showUserAdministration} animateOpacity>
              <Divider />
              <Flex
                mx="4"
                mb="8"
                mt="4"
                wrap="wrap"
                justifyContent="space-between"
              >
                <Flex
                  p="4"
                  border="1px dashed gray"
                  w={["full", "full", "60%"]}
                >
                  <TextField
                    label="Hľadať podľa používateľského mena"
                    onChange={console.log}
                    name="username"
                  />
                  USER 1
                </Flex>

                <Box p="4" border="1px dashed gray" w={["full", "full", "35%"]}>
                  <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
                    Vytvorenie nového účtu
                  </Heading>
                  <TextField
                    label="Používateľské meno"
                    onChange={console.log}
                    name="new user's username"
                  />
                  <TextField
                    label="Heslo"
                    onChange={console.log}
                    name="new user's password"
                  />
                  <Button layerStyle="outline" onClick={() => null}>
                    Vytvoriť
                  </Button>
                </Box>
              </Flex>
            </Collapse>
          </Box>
        </>
      )}
    </Box>
  );
}

export default withAuth(Dashboard);
