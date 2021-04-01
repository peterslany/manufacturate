import { Box, Divider, Flex } from "@chakra-ui/react";
import "easymde/dist/easymde.min.css";
import React, { ReactElement, RefObject } from "react";
import { Controller, DeepMap, FieldError } from "react-hook-form";
import MDEditor from "react-simplemde-editor";
import {
  Locale,
  LocaleMessages,
  ratingSubcategories,
} from "../../../../constants";
import { useLocale } from "../../../../hooks";
import { RatingFull } from "../../../../types";
import Input from "../../../Input";

interface Props {
  control: any;
  errors: DeepMap<RatingFull, FieldError>;
  label: string;
  name: string;
  register: (
    values: Record<string, unknown>
  ) => RefObject<HTMLInputElement | SimpleMDEEditor>;
}

function RatingUnitForm({
  name,
  register,
  errors,
  label,
  control,
}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();

  const ratingTypes = [
    { subCategory: "total", label: LocaleMessages.TOTAL },
    ...ratingSubcategories,
  ];

  return (
    <Box p={["8", "16"]}>
      <strong>
        {Message.RATING}: {label}
      </strong>
      <Divider mb="4" />
      <Flex wrap="wrap">
        {ratingTypes.map(({ subCategory, label: ratingLabel }) => (
          <Input
            w={["120px", "180px"]}
            mr={["2", "8"]}
            key={`${name}.${subCategory}`}
            name={`${name}.${subCategory}`}
            ref={register({
              valueAsNumber: true,
              required: Message.ERROR_FORM_REQUIRED_FIELD,
              min: { value: 0, message: Message.ERROR_FORM_MIN_VALUE_0 },
              max: { value: 10, message: Message.ERROR_FORM_MAX_VALUE_10 },
            })}
            type="number"
            label={localizeMessage(ratingLabel)}
            errors={errors}
          />
        ))}
      </Flex>
      {/* TODO: put MD editor in here, put both locales */}
      {Object.keys(Locale).map((locale) => (
        <Controller
          key={locale}
          control={control}
          name={`${name}.description.${locale}`}
          rules={{
            required: Message.ERROR_FORM_REQUIRED_FIELD,
          }}
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => <MDEditor onChange={onChange} ref={ref} value={value} />}
        />
        // TODO: render errors
        // <Input
        //   key={locale}
        //   name={`${name}.description.${locale}`}
        //   ref={register({
        //     required: Message.ERROR_FORM_REQUIRED_FIELD,
        //   })}
        //   type="text"
        //   label={Message.DESCRIPTION}
        //   errors={errors}
        // />
      ))}
    </Box>
  );
}

export default RatingUnitForm;
