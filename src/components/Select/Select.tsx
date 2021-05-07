import { Box, FormLabel, Select as ChakraSelect } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useLocale } from "../../hooks";
import { Option } from "../../types";

interface Props<T> {
  className?: string;
  hasUndefinedValue?: boolean;
  isDisabled?: boolean;
  isHiddenLabel?: boolean;
  label?: string;
  name: string;
  onChange: (value: T) => void;
  options: Option<T>[];
  value?: T;
}

function Select<T>({
  options,
  onChange,
  name,
  label,
  value,
  isDisabled,
  isHiddenLabel,
  hasUndefinedValue,
}: Props<T>): ReactElement {
  const { Message } = useLocale();

  return (
    <Box minW="fit-content">
      {label && (
        <FormLabel hidden={isHiddenLabel} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        {...{
          name,
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
            event.target.value && onChange(JSON.parse(event.target.value)),
          value: JSON.stringify(value),
        }}
        aria-label={label}
        layerStyle="outline16"
        _focus={{ layerStyle: "outline16Focused" }}
        _hover={{ boxShadow: "0 0 0 1px" }}
        isDisabled={isDisabled}
      >
        {[
          ...(hasUndefinedValue
            ? [{ label: `${Message.CHOOSE}...`, value: null }]
            : []),
          ...options,
        ].map(({ value: optionValue, label: optionLabel }) => (
          <option key={optionLabel} {...{ value: JSON.stringify(optionValue) }}>
            {optionLabel}
          </option>
        ))}
      </ChakraSelect>
    </Box>
  );
}

export default Select;
