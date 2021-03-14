import { chakra, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props extends Omit<InputProps, "onChange"> {
  label: string;
  onChange: (value: string) => void;
}

function TextField({
  label,
  className,
  onChange,
  name,
  ...props
}: Props): ReactElement {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);
  return (
    <FormLabel htmlFor={name} display="flex" flexDirection="column">
      {label}
      <Input
        _hover={{ boxShadow: "0 0 0 1px" }}
        _focus={{ layerStyle: "outlineFocused" }}
        _invalid={{ boxShadow: "0 0 0 2px red" }}
        className={className}
        layerStyle="outline"
        {...{ onChange: handleInputChange, name, ...props }}
      />
    </FormLabel>
  );
}

export default chakra(TextField);
