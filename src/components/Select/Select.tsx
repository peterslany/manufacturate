import { FormLabel, Select as ChakraSelect } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Option } from "../../types";

interface Props<T> {
  className?: string;
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
  className,
  value,
  isDisabled,
  isHiddenLabel,
}: Props<T>): ReactElement {
  return (
    <div className={className}>
      {label && (
        <FormLabel hidden={isHiddenLabel} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        {...{
          name,
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(JSON.parse(event.target.value)),
          value: JSON.stringify(value),
        }}
        aria-label={label}
        layerStyle="outline16"
        _focus={{ layerStyle: "outline16Focused" }}
        _hover={{ boxShadow: "0 0 0 1px" }}
        isDisabled={isDisabled}
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option key={optionLabel} {...{ value: JSON.stringify(optionValue) }}>
            {optionLabel}
          </option>
        ))}
      </ChakraSelect>
    </div>
  );
}

export default Select;
