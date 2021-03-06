import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";
import React, {
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Control, DeepMap, FieldError, get } from "react-hook-form";
import { useLocale } from "../../../../hooks";
import { RatingFull } from "../../../../types";
import { getProductCategoryLabel } from "../../../../utils";
import Input from "../../../Input";
import { isValidURLPathSegment } from "../utils";
import RatingFormSubCategoryPicker from "./RatingFormSubCategoryPicker";
import RatingUnitForm from "./RatingUnitForm";

interface Props {
  control: Control<Record<string, unknown>>;
  errors: DeepMap<RatingFull, FieldError>;
  initialValues: RatingFull | undefined;
  register: (values: Record<string, unknown>) => RefObject<HTMLInputElement>;
}

function RatingForm({
  initialValues,
  register,
  errors,
  control,
}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();

  const initialSubCategories = useMemo(
    () => initialValues?.subCategories || [],
    [initialValues]
  );

  const [subCategories, setSubCategories] = useState<string[]>(
    initialSubCategories
  );

  useEffect(() => {
    setSubCategories(initialSubCategories);
  }, [initialSubCategories]);

  return (
    <>
      <Box layerStyle="dashed">
        <Heading p="4">{Message.BASIC_INFORMATION}</Heading>
        <Box px={["8", "16"]}>
          <Input
            type="text"
            name="content._id"
            label={Message.ID_URL_PATH_SEGMENT}
            ref={register({
              required: Message.ERROR_FORM_REQUIRED_FIELD,
              validate: (value: string) =>
                isValidURLPathSegment(value) ||
                Message.ERROR_FORM_INVALID_URL_PATH_SEGMENT,
            })}
            {...(initialValues && { isReadOnly: true })}
            errors={errors}
          />
        </Box>
        <Box px={["8", "16"]}>
          <Input
            type="text"
            name="content.name"
            label={Message.MANUFACTURER_NAME}
            ref={register({ required: Message.ERROR_FORM_REQUIRED_FIELD })}
            errors={errors}
          />
        </Box>
        <RatingUnitForm
          label={Message.OVERALL}
          name="content.rating.overall"
          errors={errors}
          register={register}
          control={control}
        />
      </Box>
      <Box layerStyle="dashed">
        <Heading p="4" pb="0">
          {Message.CATEGORIES}
        </Heading>
        <RatingFormSubCategoryPicker
          error={Boolean(get(errors, "content.subCategories"))}
          {...{ subCategories, setSubCategories }}
        />
        {/* Shows error message when no subCategory is selected */}
        <Box ml="4" mt="-8">
          <Input
            opacity="0"
            h="0"
            w="0"
            label=""
            name="content.subCategories"
            value={subCategories.join("")}
            ref={register({
              required: Message.ERROR_FORM_RATING_HAS_TO_CONTAIN_CATEGORY,
            })}
            errors={errors}
          />
        </Box>
        {subCategories.map((categoryName, index: number) => (
          <Box
            key={categoryName}
            {...(index !== subCategories.length - 1 && {
              borderBottom: "3px double",
            })}
          >
            <RatingUnitForm
              name={`content.rating.subCategories.${categoryName}`}
              label={localizeMessage(getProductCategoryLabel(categoryName))}
              errors={errors}
              register={register}
              control={control}
            />
          </Box>
        ))}
      </Box>
      {initialSubCategories
        ?.filter((category) => !subCategories.includes(category))
        .map((category) => (
          <Alert key={category} my="4" status="warning" fontSize="lg">
            <AlertIcon />
            {Message.ALERT_SAVING_CHANGES_WILL_DELETE_CATEGORY}
            {localizeMessage(getProductCategoryLabel(category))}
          </Alert>
        ))}
    </>
  );
}

export default RatingForm;
