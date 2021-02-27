import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Code,
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {}

function Home({}: Props): ReactElement {
  return (
    <Box height="100vh">
      <Text textStyle="p">
        Example repository of
        <Code>Next.js</Code> +<Code>chakra-ui</Code> +<Code>typescript</Code>.
      </Text>

      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Box>
  );
}

export default Home;
