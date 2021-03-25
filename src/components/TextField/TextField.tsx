import {
  FormLabel,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { get } from "lodash";
import React, { forwardRef, MutableRefObject, ReactElement } from "react";
import { DeepMap, FieldError } from "react-hook-form";

interface Props extends Omit<InputProps & NumberInputProps, "onChange"> {
  errors?: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  type: string;
}

function TextField(
  { label, className, onChange, name, errors, type, ...props }: Props,
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

  return (
    <FormLabel htmlFor={name} display="flex" flexDirection="column">
      {label}
      {type === "number" ? (
        <NumberInput {...props} step={0.1} min={0} max={10}>
          <NumberInputField
            ref={ref}
            _hover={{ boxShadow: "0 0 0 1px" }}
            _focus={{ layerStyle: !error ? "outlineFocused" : "outlineError" }}
            _invalid={{ border: "2px solid red" }}
            className={className}
            isInvalid={Boolean(error)}
            layerStyle="outline"
            {...{ onChange: handleInputChange, name, type }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : (
        <Input
          ref={ref}
          _hover={{ boxShadow: "0 0 0 1px" }}
          _focus={{ layerStyle: !error ? "outlineFocused" : "outlineError" }}
          _invalid={{ border: "2px solid red" }}
          className={className}
          isInvalid={Boolean(error)}
          layerStyle="outline"
          {...{ onChange: handleInputChange, name, type, ...props }}
        />
      )}
      <Text color="red">{error}</Text>
    </FormLabel>
  );
}

export default forwardRef<HTMLInputElement, Props>(TextField);
