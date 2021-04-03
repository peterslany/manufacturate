import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { ReactElement, RefObject } from "react";
import { Control, DeepMap, FieldError } from "react-hook-form";
import {
  Locale,
  LocaleMessages,
  ratingSubcategories,
} from "../../../../constants";
import { useLocale } from "../../../../hooks";
import { RatingFull } from "../../../../types";
import Input from "../../../Input";
import MDEditor from "../../../MDEditor";

interface Props {
  control: Control<Record<string, unknown>>;
  errors: DeepMap<RatingFull, FieldError>;
  label: string;
  name: string;
  register: (values: Record<string, unknown>) => RefObject<HTMLInputElement>;
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
      <Flex wrap="wrap" mb="2">
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
      <strong>{Message.DESCRIPTION}</strong>
      {Object.keys(Locale).map((locale) => (
        <MDEditor
          key={`${name}.description.${locale}`}
          label={locale}
          name={`${name}.description.${locale}`}
          {...{ control, errors }}
        />
      ))}
    </Box>
  );
}

export default RatingUnitForm;
