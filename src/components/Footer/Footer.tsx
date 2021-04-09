import { Box, Center, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "..";
import { Path, publicHeaderItems } from "../../constants";
import { useLocale } from "../../hooks";

function Footer(): ReactElement {
  const { Message, localizeMessage } = useLocale();

  return (
    <Center bg="gray.700" color="gray.50">
      <Flex
        maxW="1024px"
        flexGrow={1}
        as="footer"
        p={[4, 8]}
        wrap="wrap"
        justify="space-between"
        align="flex-end"
      >
        <Box p="8" as="nav" display="inline-grid">
          {publicHeaderItems.map(({ label, path }) => (
            <Link w="fit-content" key={path} href={path}>
              {localizeMessage(label)}
            </Link>
          ))}
          <Link w="fit-content" href={Path.METHODOLOGY}>
            {Message.METHODOLOGY}
          </Link>
          <Link mt="4" w="fit-content" href={Path.CONTACT}>
            {Message.CONTACT_US}
          </Link>
        </Box>

        <Box p="8" display="inline-grid">
          <Link w="fit-content" my="4" href={Path.AUTH_LOGIN}>
            {Message.LOGIN_TEAM_MEMBER}
          </Link>
          <Link w="fit-content" mb="8" href={Path.PRIVACY_POLICY}>
            {Message.PRIVACY_POLICY}
          </Link>
          &copy; 2021
        </Box>
      </Flex>
    </Center>
  );
}

export default Footer;
