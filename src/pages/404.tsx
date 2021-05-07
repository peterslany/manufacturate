import { Center, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React, { ReactElement } from "react";
import { Head, Link } from "../components";
import { Path } from "../constants";
import { useLocale } from "../hooks";

function Error404(): ReactElement {
  const { Message } = useLocale();
  return (
    <Center minH="90vh" flexDirection="column">
      <Head title="404" metaDescription="404, Page not found page" />
      <Center p={[4, 8]}>
        <Image
          src="/svg/404.svg"
          alt="Pozadie, ilustrácia zeme"
          width={960}
          height={280}
        />
      </Center>

      <Heading p={[4, 8]} maxW="760px" textAlign="center">
        {Message[404].split("^")[0]}

        <Link
          textDecoration="underline"
          _after={{ content: '"🙂"', position: "absolute", paddingLeft: "2" }}
          _hover={{
            color: "green.500",
            _after: { content: '"😉"' },
          }}
          href={Path.ROOT}
        >
          {Message[404].split("^")[1]}
        </Link>
      </Heading>
    </Center>
  );
}

export default Error404;
