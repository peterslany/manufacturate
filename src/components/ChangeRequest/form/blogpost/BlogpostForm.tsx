import { Box, Heading } from "@chakra-ui/react";
import React, { ReactElement, RefObject } from "react";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";
import { ChangeRequestFormMode, Locale } from "../../../../constants";
import { useLocale } from "../../../../hooks";
import { Blogpost } from "../../../../types";
import Input from "../../../Input";
import MDEditor from "../../../MDEditor";
import Select from "../../../Select";

interface Props {
  control: Control<Record<string, unknown>>;
  errors: DeepMap<Blogpost, FieldError>;
  mode: ChangeRequestFormMode;
  register: (values: Record<string, unknown>) => RefObject<HTMLInputElement>;
}

function BlogpostForm({
  register,
  errors,
  control,
  mode,
}: Props): ReactElement {
  const { Message, locale } = useLocale();

  return (
    <Box layerStyle="dashed">
      <Heading p="4">{Message.BASIC_INFORMATION}</Heading>
      <Box px={["8", "16"]}>
        <input type="hidden" name="content._id" ref={register({})} />
      </Box>
      <Box px={["8", "16"]}>
        <Controller
          control={control}
          defaultValue={locale}
          name="content.locale"
          render={({ onChange, value }) => (
            <Select
              label={Message.LANGUAGE}
              name="content.locale"
              onChange={onChange}
              value={value}
              options={Object.values(Locale).map((localeItem: Locale) => ({
                value: localeItem,
                label: localeItem,
              }))}
              isDisabled={mode !== ChangeRequestFormMode.CREATE_NEW}
            />
          )}
        />
        <Input
          type="text"
          name="content.urlPathSegment"
          label={Message.BLOGPOST_URL_PATH_SEGMENT}
          ref={register({ required: Message.ERROR_FORM_REQUIRED_FIELD })}
          errors={errors}
          isReadOnly={mode !== ChangeRequestFormMode.CREATE_NEW}
        />
      </Box>
      <Box px={["8", "16"]}>
        <Input
          type="text"
          name="content.name"
          label={Message.BLOGPOST_NAME}
          ref={register({ required: Message.ERROR_FORM_REQUIRED_FIELD })}
          errors={errors}
        />
      </Box>
      <Box px={["8", "16"]}>
        <Input
          type="text"
          name="content.subTitle"
          label={Message.SUB_TITLE}
          ref={register({ required: Message.ERROR_FORM_REQUIRED_FIELD })}
          errors={errors}
        />
      </Box>
      <Box px={["8", "16"]}>
        <Input
          type="text"
          name="content.thumbnailUrl"
          label={Message.BLOGPOST_THUMBNAIL_URL}
          ref={register({ required: Message.ERROR_FORM_REQUIRED_FIELD })}
          errors={errors}
        />
      </Box>

      <MDEditor
        label={Message.CONTENT}
        control={control}
        errors={errors}
        name="content.content"
      />
    </Box>
  );
}

export default BlogpostForm;
