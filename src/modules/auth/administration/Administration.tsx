import { Box, Divider } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { CollapsibleSection } from "../../../components";
import ChangeRequestsList from "../../../components/ChangeRequest/ChangeRequestsList";
import { useLocale } from "../../../hooks";
import withAuth from "../withAuth";
import UsersAdministration from "./usersAdministration/UsersAdministration";

function Administration(): ReactElement {
  const { Message } = useLocale();
  return (
    <Box layerStyle="layout">
      <ChangeRequestsList header={Message.WAITING_CHANGE_REQUESTS} admin />
      <Divider my="4" />
      <CollapsibleSection title={Message.USERS_ADMINISTRATION}>
        <UsersAdministration />
      </CollapsibleSection>
    </Box>
  );
}

export default withAuth(Administration, true);
