import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement } from "react";
import { UrlParamSearchbar } from "../../components";
import { Path } from "../../constants";
import { useLocale } from "../../hooks";

interface Props {}

function Home({}: Props): ReactElement {
  const { Message } = useLocale();

  const glassStyle = useColorModeValue("glassLight", "glassDark");

  return (
    <Flex
      height="90vh"
      align="center"
      justify="space-evenly"
      direction="column"
    >
      <Box
        zIndex={-1}
        maxW={["80%", "60%", "50%"]}
        position="absolute"
        top={[8, 4, 4, -8]}
        right={[4, 8, 12, 16, 32, 64]}
        opacity="0.2"
      >
        <Image
          src="/svg/www.svg"
          alt="Pozadie, ilustrácia zeme"
          width={960}
          height={960}
        />
      </Box>
      <Text
        w={["90%", "80%", "70%"]}
        textStyle="serif"
        fontSize={["2xl", "4xl", "6xl"]}
        align="center"
      >
        {Message.HOMEPAGE_MAIN_TEXT}
      </Text>
      Vyhladaj vyrobcu
      <UrlParamSearchbar
        borderWidth={2}
        layerStyle={glassStyle}
        variant="dashed"
        redirectPath={Path.RATINGS}
        placeholder={Message.MANUFACTURER_NAME}
        disableEmptyQuery
      />
    </Flex>
  );
}

export default Home;
