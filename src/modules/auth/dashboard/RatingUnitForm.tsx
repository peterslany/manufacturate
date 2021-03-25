import { Divider, Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import { TextField } from "../../../components";
import { LocaleMessages, ratingSubcategories } from "../../../constants";
import { useLocale } from "../../../hooks";

interface Props {
  errors: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  register: any;
}

function RatingUnitForm({
  name,
  register,
  errors,
  label,
}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();

  const ratingTypes = [
    { subcategory: "total", label: LocaleMessages.TOTAL },
    ...ratingSubcategories,
  ];
  return (
    <>
      <strong>{label}</strong>
      <Divider />
      <Flex wrap="wrap" justify="space-between">
        {ratingTypes.map(({ subcategory, label: ratingLabel }) => (
          <TextField
            w={["120px", "180px"]}
            mr={["2", "8"]}
            key={`${name}.${subcategory}`}
            name={`${name}.${subcategory}`}
            ref={register({
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
      {/* TODO: put MD editor in here */}
      <TextField
        name={`${name}.description`}
        ref={register({
          required: Message.ERROR_FORM_REQUIRED_FIELD,
        })}
        type="text"
        label={Message.DESCRIPTION}
        errors={errors}
      />
    </>
  );
}

export default RatingUnitForm;
