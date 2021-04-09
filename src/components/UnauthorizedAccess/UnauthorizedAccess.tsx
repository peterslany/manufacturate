import { WarningIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Head, Link } from "..";
import { useLocale } from "../../hooks";

function UnauthorizedAccess(): ReactElement {
  const { Message } = useLocale();

  const { route } = useRouter();
  return (
    <Box textAlign="center" p={[8, 12]}>
      <WarningIcon mr="2" fontSize="3xl" color="red" />
      <Head
        title={Message.UNAUTHORIZED_ACCESS}
        metaDescription={Message.UNAUTHORIZED_ACCESS}
      />
      {Message.UNAUTHORIZED_ACCESS_TEXT.split("^")[0]}{" "}
      <Link textDecoration="underline" href="/">
        {" "}
        {Message.UNAUTHORIZED_ACCESS_TEXT.split("^")[1]}
      </Link>{" "}
      {Message.UNAUTHORIZED_ACCESS_TEXT.split("^")[2]}
      <Link
        textDecoration="underline"
        href={`/auth/login?callbackUrl=${route}`}
      >
        {" "}
        {Message.UNAUTHORIZED_ACCESS_TEXT.split("^")[3]}
      </Link>{" "}
      {Message.UNAUTHORIZED_ACCESS_TEXT.split("^")[4]}
    </Box>
  );
}

export default UnauthorizedAccess;
