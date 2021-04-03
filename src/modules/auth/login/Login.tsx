import { Alert, AlertIcon, Center, Heading } from "@chakra-ui/react";
import { isEmpty, isString } from "lodash";
import { signIn, useSession } from "next-auth/client";
import React, { ReactElement, useState } from "react";
import { Button, Input, LogoutButton } from "../../../components";
import { useLocale, useUrlParam } from "../../../hooks";

function Login(): ReactElement {
  const { Message } = useLocale();
  const [session] = useSession();

  const [callbackUrl] = useUrlParam("callbackUrl");
  const [error] = useUrlParam("error");

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLoginSubmit = () =>
    signIn("credentials", {
      username,
      password,
      callbackUrl:
        isString(callbackUrl) && !isEmpty(callbackUrl)
          ? callbackUrl
          : "/auth/dashboard",
    });

  return session ? (
    <Center flexDirection={["column", "column", "row"]} p={["4", "8", "16"]}>
      {Message.CURENTLY_LOGGED_IN_AS}
      <strong style={{ marginLeft: 4, marginRight: 24 }}>
        {session.user.username}
      </strong>
      <LogoutButton />
    </Center>
  ) : (
    <Center flexDirection="column" p={["4", "8", "16"]}>
      <Heading pb="8">{Message.LOGIN_TEAM_MEMBER}</Heading>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={() => handleLoginSubmit()}
      >
        <Input
          name="username"
          isRequired
          isInvalid={isEmpty(username)}
          value={username}
          onChange={setUsername}
          type="text"
          label={Message.USERNAME}
          layerStyle="outline"
          mb="2"
        />
        <Input
          name="password"
          isRequired
          isInvalid={isEmpty(password)}
          value={password}
          onChange={setPassword}
          type="password"
          label={Message.PASSWORD}
          layerStyle="outline"
          mb="2"
        />
        <Button
          my="4"
          isDisabled={isEmpty(username) || isEmpty(password)}
          layerStyle="outline"
          type="submit"
          onClick={() => handleLoginSubmit()}
        >
          {Message.LOG_IN}
        </Button>
      </form>
      {error && (
        <Alert w="fit-content" status="error">
          <AlertIcon />
          {Message.LOGGING_IN_FAILED}
        </Alert>
      )}
    </Center>
  );
}

export default Login;
