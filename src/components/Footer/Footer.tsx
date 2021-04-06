import { Box, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "..";
import { Path, publicHeaderItems } from "../../constants";
import { useLocale } from "../../hooks";

interface Props {}

function Footer({}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();
  const [bg, fg] = useColorModeValue(
    ["gray.700", "gray.50"],
    ["gray.300", "gray.900"]
  );
  return (
    <Center bg={bg} color={fg}>
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
            <Link key={path} href={path}>
              {localizeMessage(label)}
            </Link>
          ))}
          <Link href={Path.METHODOLOGY}>{Message.METHODOLOGY}</Link>
          <Link mt="8" href={Path.AUTH_LOGIN}>
            {Message.LOGIN_TEAM_MEMBER}
          </Link>
        </Box>

        <Box p="8" display="inline-grid">
          <Link mb="8" href={Path.PRIVACY_POLICY}>
            {Message.PRIVACY_POLICY}
          </Link>
          &copy; 2021
        </Box>
      </Flex>
    </Center>
  );
}

export default Footer;
