import {
  Box,
  FormLabel,
  Input as ChakraInput,
  InputProps,
  NumberInputProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { get } from "lodash";
import React, { forwardRef, MutableRefObject, ReactElement } from "react";
import { DeepMap, FieldError } from "react-hook-form";

interface Props extends Omit<InputProps & NumberInputProps, "onChange"> {
  errors?: DeepMap<unknown, FieldError>;
  label: string;
  name: string;
  onChange?: (value: string) => void;
}

function Input(
  { label, className, onChange, name, errors, ...props }: Props,
  ref:
    | MutableRefObject<HTMLInputElement | null>
    | ((instance: HTMLInputElement | null) => void)
    | null
): ReactElement {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const error = get(errors, name)?.message;

  const readOnlyColor = useColorModeValue("gray.400", "gray.600");
  return (
    <Box className={className}>
      <FormLabel htmlFor={name} display="flex" flexDirection="column">
        {label}
      </FormLabel>

      <ChakraInput
        ref={ref}
        _hover={{ boxShadow: "0 0 0 1px" }}
        _focus={{ layerStyle: !error ? "outline16Focused" : "outline16Error" }}
        _invalid={{ border: "2px solid red" }}
        _readOnly={{ color: readOnlyColor, cursor: "not-allowed" }}
        isInvalid={Boolean(error)}
        layerStyle="outline16"
        step="any"
        {...{ onChange: handleInputChange, name, ...props }}
      />

      <Text color="red">{error}</Text>
    </Box>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);
