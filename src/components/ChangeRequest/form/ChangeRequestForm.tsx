import { Box, Center, Spinner } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/client";
import { ReactElement, RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChangeRequestFormMode, ContentType } from "../../../constants";
import { useGet, useLocale, useRequest } from "../../../hooks";
import { Blogpost, GeneralChangeRequest, RatingFull } from "../../../types";
import { generateBlogpostIdFromValues } from "../../../utils";
import Input from "../../Input";
import BlogpostForm from "./blogpost/BlogpostForm";
import RatingForm from "./rating/RatingForm";
import {
  generateRatingMetadata,
  getDataUrl,
  getSendUrlAndMethod,
} from "./utils";

type ChangeRequestFormBase =
  | {
      changeRequestId?: never;
      contentId?: never;
      mode: ChangeRequestFormMode.CREATE_NEW;
    }
  | {
      changeRequestId?: never;
      contentId: string;
      mode: ChangeRequestFormMode.CREATE_FROM_CONTENT;
    }
  | {
      changeRequestId: string;
      contentId?: never;
      mode: ChangeRequestFormMode.EDIT;
    };

export type ChangeRequestFormProps<T> = ChangeRequestFormBase & {
  contentType: T;
  onSuccessCallback?: () => void;
  submitRef?: RefObject<HTMLButtonElement>;
};

function ChangeRequestForm<T extends ContentType>({
  contentType,
  changeRequestId,
  contentId,
  mode,
  submitRef,
  onSuccessCallback,
}: ChangeRequestFormProps<T>): ReactElement {
  const [session] = useSession();

  const author = session?.user.username;

  const { Message } = useLocale();

  const url = getDataUrl(mode, contentType, changeRequestId, contentId);

  const { data } = useGet<GeneralChangeRequest | RatingFull | Blogpost>(url);

  const [renderChildren, setRenderChildren] = useState(
    mode === ChangeRequestFormMode.CREATE_NEW
  );
  const [initializingValues, setInitializingValues] = useState(
    mode !== ChangeRequestFormMode.CREATE_NEW
  );

  const content =
    mode === ChangeRequestFormMode.EDIT
      ? (data as GeneralChangeRequest | undefined)?.content
      : (data as RatingFull | Blogpost | undefined);

  const [sendUrl, sendMethod] = getSendUrlAndMethod(mode, changeRequestId);

  const successMessage =
    mode === ChangeRequestFormMode.EDIT
      ? Message.INFO_CHANGE_REQUEST_SAVED
      : Message.INFO_CHANGE_REQUEST_CREATED;

  const { send } = useRequest(sendUrl, sendMethod, {
    onSuccessCallback: () => onSuccessCallback && onSuccessCallback(),
    successMessage,
  });

  const { register, errors, setValue, handleSubmit, control } = useForm();

  // for setting initial values
  useEffect(() => {
    if (mode !== ChangeRequestFormMode.CREATE_NEW && content) {
      // renders children after modal is shown, so transition is not lagging
      setTimeout(() => setRenderChildren(true), 200);
      // sets initial values after all children and corresponding values are mounted into DOM
      setTimeout(
        () =>
          setValue(
            "content",
            mode === ChangeRequestFormMode.CREATE_FROM_CONTENT
              ? content
              : content
          ),
        700
      );
      setTimeout(() => setInitializingValues(false), 1000);
      if (mode === ChangeRequestFormMode.EDIT) {
        setTimeout(() => setValue("note", (data as GeneralChangeRequest).note));
      }
    }
  }, [content, data, mode, setValue]);

  const handleFormSubmit = (values: GeneralChangeRequest) => {
    const date = new Date().toISOString();

    let requestBodyBase = {
      ...(mode === ChangeRequestFormMode.EDIT && { _id: changeRequestId }),
      ...values,
      type: contentType,
      date,
      author,
      content: { ...values.content, date },
    };

    if (contentType === ContentType.RATING) {
      const metadata = generateRatingMetadata(
        content as RatingFull,
        values.content as RatingFull,
        author
      );

      requestBodyBase = {
        ...requestBodyBase,
        content: { ...requestBodyBase.content, ...metadata },
      };
    }
    if (contentType === ContentType.BLOGPOST) {
      const _id = isEmpty(values.content._id)
        ? generateBlogpostIdFromValues(values.content as Blogpost)
        : values.content._id;

      requestBodyBase = {
        ...requestBodyBase,
        content: {
          ...requestBodyBase.content,
          _id,
          author:
            (isEmpty(session?.user.name) ? author : session?.user.name) || "",
        },
      };
    }

    send(requestBodyBase);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {initializingValues && (
        <Center
          h="full"
          w="full"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          flexDirection="column"
        >
          <Spinner size="xl" />
          {Message.LOADING}
        </Center>
      )}
      <Box
        opacity={initializingValues ? 0 : 1}
        transition="500ms all ease-in-out"
      >
        {renderChildren &&
          (contentType === ContentType.RATING ? (
            <RatingForm
              initialValues={content as RatingFull | undefined}
              {...{
                register: register as never,
                errors,
              }}
              control={control}
            />
          ) : (
            <BlogpostForm
              {...{ mode, control, errors, register: register as never }}
            />
          ))}
        <Box my={[4, 8]}>
          <Input name="note" ref={register} label={Message.NOTE} />
        </Box>
      </Box>

      <button hidden type="submit" ref={submitRef} />
    </form>
  );
}

export default ChangeRequestForm;
