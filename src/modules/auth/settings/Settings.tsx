import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/client";
import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../components";
import { ApiUrl } from "../../../constants";
import { useGet, useLocale, usePut } from "../../../hooks";
import { User } from "../../../types";
import withAuth from "../withAuth";

interface Props {}

function Settings({}: Props): ReactElement {
  const { Message } = useLocale();

  const [session] = useSession();

  const { data: user } = useGet<User>(
    session ? `${ApiUrl.USERS}/${session.user.username}` : undefined
  );

  const { send } = usePut(`${ApiUrl.USERS}/${session?.user.username}`, {
    successMessage: Message.INFO_ACCOUNT_CHANGES_SAVED,
  });

  const { register, handleSubmit, watch, trigger, setValue, errors } = useForm<{
    name: string;
    password: string;
    passwordAgain: string;
  }>({
    mode: "all",
    defaultValues: { name: user?.name },
  });

  const watchPassword = watch("password");
  const watchName = watch("name");

  useEffect(() => {
    trigger("passwordAgain");
  }, [trigger, watchPassword]);

  useEffect(() => {
    setValue("name", user?.name, { shouldValidate: true });
  }, [setValue, user]);

  const handleChangeSubmit = handleSubmit(({ name, password }) =>
    send({ name, ...(password && { password }) })
  );

  const allowSubmit =
    isEmpty(errors) && (!isEmpty(watchPassword) || watchName !== user?.name);

  return (
    <Center>
      <Box
        p="4"
        border="1px dashed gray"
        maxW="420px"
        mx={[2, 4, 8]}
        my={[2, 4, 6]}
      >
        <Heading>{Message.ACCOUNT_SETTINGS}</Heading>
        <Divider my="2" />
        <form onSubmit={handleChangeSubmit}>
          <TextField
            label={Message.USERNAME}
            name="username"
            type="text"
            isDisabled
            defaultValue={session?.user.username}
          />

          <TextField label="Name" name="name" type="text" ref={register} />
          <TextField
            ref={register({
              minLength: {
                value: 8,
                message: Message.ERROR_FORM_MUST_HAVE_AT_LEAST_8_CHARACTERS,
              },
            })}
            autoComplete="new-password"
            label={Message.NEW_PASSWORD}
            name="password"
            type="password"
            errors={errors}
          />
          <TextField
            ref={register({
              validate: (value) =>
                value === watchPassword ||
                Message.ERROR_FORM_PASSWORDS_DONT_MATCH,
            })}
            autoComplete="new-password"
            label={Message.NEW_PASSWORD_AGAIN}
            name="passwordAgain"
            type="password"
            errors={errors}
          />
          <Button layerStyle="outline" isDisabled={!allowSubmit} type="submit">
            {Message.SAVE_CHANGES}
          </Button>
        </form>
      </Box>
    </Center>
  );
}

export default withAuth(Settings);
