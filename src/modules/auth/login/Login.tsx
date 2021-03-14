import { Alert, AlertIcon, Center, Heading } from "@chakra-ui/react";
import { isEmpty, isString } from "lodash";
import { signIn, useSession } from "next-auth/client";
import React, { ReactElement, useState } from "react";
import { Button, LogoutButton, TextField } from "../../../components";
import { useUrlParam } from "../../../hooks";

function Login(): ReactElement {
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
    <Center p="16">
      Momentálne ste prihlásený/á pod účtom:
      <strong style={{ marginLeft: 4, marginRight: 24 }}>
        {session.user.username}
      </strong>
      <LogoutButton />
    </Center>
  ) : (
    <Center as="form" flexDirection="column" p="16">
      <Heading pb="8">Prihlásenie hodnotiteľa</Heading>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={() => handleLoginSubmit()}
      >
        <TextField
          name="username"
          isRequired
          isInvalid={isEmpty(username)}
          value={username}
          onChange={setUsername}
          type="text"
          label="Užívateľské meno"
          layerStyle="outline"
        />
        <TextField
          name="password"
          isRequired
          isInvalid={isEmpty(password)}
          value={password}
          onChange={setPassword}
          type="password"
          label="Heslo"
          layerStyle="outline"
        />
        <Button
          my="4"
          isDisabled={isEmpty(username) || isEmpty(password)}
          layerStyle="outline"
          type="submit"
          onClick={() => handleLoginSubmit()}
        >
          Prihlásiť sa
        </Button>
      </form>
      {error && (
        <Alert w="fit-content" status="error">
          <AlertIcon />
          Prihlásenie sa nepodarilo, zadali ste nesprávnu kombináciu mena a
          hesla.
        </Alert>
      )}
    </Center>
  );
}

export default Login;
