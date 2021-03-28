import { useSession } from "next-auth/client";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components";
import { ChangeRequestFormMode, ChangeRequestType } from "../../../constants";
import { useGet, useLocale, useRequest } from "../../../hooks";
import { Blogpost, GeneralChangeRequest, RatingFull } from "../../../types";
import {
  generateRatingMetadata,
  getDataUrl,
  getSendUrlAndMethod,
} from "./formUtils";
import RatingForm from "./RatingForm";

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
};

function ChangeRequestForm<T extends ChangeRequestType>({
  contentType,
  changeRequestId,
  contentId,
  mode,
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
    onSuccessCallback: () => alert("close modal"),
  });

  const { register, errors, setValue, handleSubmit } = useForm();

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

    if (contentType === ChangeRequestType.RATING) {
      console.log(values);
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
    if (contentType === ChangeRequestType.BLOGPOST) {
      // TODO: add metadata for blogpost
    }

    console.log(requestBodyBase);
    send(requestBodyBase);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {contentType === ChangeRequestType.RATING ? (
        <RatingForm
          initialValues={content as RatingFull | undefined}
          {...{ register, errors }}
        />
      ) : (
        <></>
      )}
      <Input name="note" ref={register} label={Message.NOTE} />
      <Button type="submit">SUBMIT</Button>
    </form>
  );
}

export default ChangeRequestForm;
