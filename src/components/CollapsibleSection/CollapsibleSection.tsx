import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Collapse, Divider, Flex } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  openByDefault?: boolean;
  title: string;
}

function CollapsibleSection({
  openByDefault,
  title,
  children,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(openByDefault));
  return (
    <Box w="full" layerStyle="outline">
      <Flex
        justifyContent="space-between"
        cursor="pointer"
        p="4"
        _hover={{ fontWeight: 600, textDecoration: "underline" }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        <ChevronDownIcon
          fontSize="xl"
          {...(isOpen && {
            transform: "rotate(180deg)",
          })}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Divider />
        {children}
      </Collapse>
    </Box>
  );
}

export default CollapsibleSection;
