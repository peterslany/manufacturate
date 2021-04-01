import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { ReactElement, useEffect, useState } from "react";
import { CollapsibleSection } from "../../../components";
import { withLink } from "../../../components/Link";
import { ApiUrl, ContentType, Path } from "../../../constants";
import { useGet, useLocale } from "../../../hooks";
import {
  BasicRating,
  BlogpostBase,
  ChangeRequestsListData,
} from "../../../types";
import withAuth from "../withAuth";
import Content from "./Content";

interface Props {}

function Dashboard({}: Props): ReactElement {
  const { Message } = useLocale();
  const [session, loading] = useSession();

  const isAdmin = session?.user.isAdmin;

  const { data } = useGet<ChangeRequestsListData>(
    isAdmin ? `${ApiUrl.CHANGE_REQUESTS}?all=true` : undefined
  );

  const [changeRequestCount, setChangeRequestCount] = useState<number>();

  useEffect(() => {
    if (data) {
      setChangeRequestCount(data.count);
    }
  }, [data]);

  const ViewNow = withLink(() => (
    <Flex
      textDecoration="underline"
      fontWeight="600"
      ml="2"
      role="group"
      align="center"
    >
      {" "}
      {Message.VIEW}
      <ArrowForwardIcon
        transition="all 300ms ease-in-out"
        _groupHover={{ translate: "5px" }}
      />{" "}
    </Flex>
  ));

  return (
    <Box mx={[2, 4, 8]} mt={[2, 4, 6]}>
      {changeRequestCount && changeRequestCount !== 0 ? (
        <Alert my="4" status="warning" fontSize="lg">
          <AlertIcon />
          {Message.ALERT_CHANGE_REQUESTS_WAITING}( {changeRequestCount} ).{" "}
          <ViewNow href={Path.AUTH_ADMINISTRATION} linkText={Message.VIEW} />
        </Alert>
      ) : null}
      <Heading>
        {Message.WELCOME}, {session?.user.username}
      </Heading>
      <Divider />
      <Text>Tu môžeš vytvárať a upravovať hodnotenia a blogy</Text>
      <CollapsibleSection title={Message.RATINGS}>
        <Content<BasicRating>
          setChangeRequestsCount={setChangeRequestCount}
          type={ContentType.RATING}
        />
      </CollapsibleSection>
      <CollapsibleSection title={Message.BLOG}>
        <Content<BlogpostBase>
          setChangeRequestsCount={setChangeRequestCount}
          type={ContentType.BLOGPOST}
        />
      </CollapsibleSection>
    </Box>
  );
}

export default withAuth(Dashboard);
