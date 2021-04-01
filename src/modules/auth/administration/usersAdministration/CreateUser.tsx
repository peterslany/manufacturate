import { Center } from "@chakra-ui/react";
import { debounce, isEmpty } from "lodash";
import React, { ReactElement, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../../components";
import { ApiUrl } from "../../../../constants";
import { useLocale, usePost } from "../../../../hooks";
import { User } from "../../../../types";

interface Props {
  onCreateCallback?: (newUser: User) => void;
}

function CreateUser({ onCreateCallback }: Props): ReactElement {
  const { Message } = useLocale();

  const { register, handleSubmit, watch, trigger, errors } = useForm({
    mode: "all",
  });

  const watchPassword = watch("password");

  useEffect(() => {
    trigger("passwordAgain");
  }, [trigger, watchPassword]);

  const isUsernameAvailable = useCallback(
    debounce(
      async (username: string) => {
        const res = await fetch(`/api/users/${username}`);
        return res.status === 404;
      },
      300,
      { leading: true }
    ),
    []
  );

  const { send } = usePost(ApiUrl.USERS, {
    successMessage: Message.INFO_USER_ACCOUNT_CREATED,
  });

  const handleFormSubmit = handleSubmit(({ username, password }) => {
    send({ username, password });
    if (onCreateCallback) {
      onCreateCallback({ username, name: "", isAdmin: false });
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        ref={register({
          required: Message.ERROR_FORM_REQUIRED_FIELD,
          validate: async (value) =>
            (await isUsernameAvailable(value)) ||
            Message.ERROR_FORM_USERNAME_USED,
        })}
        errors={errors}
        label={Message.USERNAME}
        name="username"
        type="text"
      />
      <Input
        ref={register({
          required: Message.ERROR_FORM_REQUIRED_FIELD,
        })}
        label={Message.PASSWORD}
        autoComplete="new-password"
        name="password"
        type="password"
        errors={errors}
      />
      <Input
        ref={register({
          validate: (value) =>
            value === watchPassword || Message.ERROR_FORM_PASSWORDS_DONT_MATCH,
        })}
        label={Message.PASSWORD_AGAIN}
        autoComplete="new-password"
        name="passwordAgain"
        type="password"
        errors={errors}
      />
      <Center>
        <Button
          mt="4"
          px="8"
          isDisabled={!isEmpty(errors)}
          type="submit"
          layerStyle="outline"
        >
          {Message.CREATE}
        </Button>
      </Center>
    </form>
  );
}

export default CreateUser;
