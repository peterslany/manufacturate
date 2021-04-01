import { Box, Divider } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { CollapsibleSection } from "../../../components";
import ChangeRequestsList from "../../../components/ChangeRequest/ChangeRequestsList";
import { useLocale } from "../../../hooks";
import withAuth from "../withAuth";
import UsersAdministration from "./usersAdministration/UsersAdministration";

interface Props {}

function Administration({}: Props): ReactElement {
  const { Message } = useLocale();
  return (
    <Box p="12">
      <ChangeRequestsList header={Message.WAITING_CHANGE_REQUESTS} admin />
      <Divider my="4" />
      <CollapsibleSection title={Message.USERS_ADMINISTRATION}>
        <UsersAdministration />
      </CollapsibleSection>
    </Box>
  );
}

export default withAuth(Administration, true);
