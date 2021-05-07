import { Center, Heading, Text } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  heading: string;
}

function BasicPage({ heading, children }: Props): ReactElement {
  return (
    <Center p={[4, 8]} flexDirection="column" textStyle="serif">
      <Heading textStyle="serif">{heading}</Heading>
      <Text maxW="840px" borderTop="1px solid #78787829" pt="4" mt="4">
        {children}
      </Text>
    </Center>
  );
}

export default BasicPage;
