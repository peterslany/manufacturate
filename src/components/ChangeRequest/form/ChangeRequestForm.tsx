import { useSession } from "next-auth/client";
import { ReactElement, RefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChangeRequestFormMode, ContentType } from "../../../constants";
import { useGet, useLocale, useRequest } from "../../../hooks";
import { Blogpost, GeneralChangeRequest, RatingFull } from "../../../types";
import Input from "../../Input";
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

  const { data, loading } = useGet<
    GeneralChangeRequest | RatingFull | Blogpost
  >(url);

  const content =
    mode === ChangeRequestFormMode.EDIT
      ? (data as GeneralChangeRequest | undefined)?.content
      : (data as RatingFull | Blogpost | undefined);

  const [sendUrl, sendMethod] = getSendUrlAndMethod(mode, changeRequestId);

  const { send } = useRequest(sendUrl, sendMethod, {
    onSuccessCallback: () => onSuccessCallback && onSuccessCallback(),
  });

  const { register, errors, setValue, handleSubmit, control } = useForm();

  // sets initial values
  useEffect(() => {
    if (mode !== ChangeRequestFormMode.CREATE_NEW && content) {
      setTimeout(() =>
        setValue(
          "content",
          mode === ChangeRequestFormMode.CREATE_FROM_CONTENT ? content : content
        )
      );

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
      // TODO: add metadata for blogpost
    }

    send(requestBodyBase);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {contentType === ContentType.RATING ? (
        <RatingForm
          initialValues={content as RatingFull | undefined}
          {...{
            register: register as never,
            errors,
          }}
          control={control}
        />
      ) : (
        <></>
      )}
      <Input name="note" ref={register} label={Message.NOTE} />
      <button hidden type="submit" ref={submitRef} />
    </form>
  );
}

export default ChangeRequestForm;
