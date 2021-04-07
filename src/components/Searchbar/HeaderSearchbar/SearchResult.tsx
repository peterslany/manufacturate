import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BasicRating, BlogpostBase } from "../../../types";
import Link from "../../Link";

interface ItemProps {
  href: string;
  loading: boolean;
  name: string;
  onClick: () => void;
}

function Item({ name, href, loading, onClick }: ItemProps): ReactElement {
  const [itemBg, itemHoverBg] = useColorModeValue(
    ["gray.900A10", "gray.900A20"],

    ["gray.50A20", "gray.50A10"]
  );
  return (
    <Skeleton
      opacity={loading ? 0.4 : 1}
      borderRadius="16px"
      m="2"
      isLoaded={!loading}
    >
      <Link
        href={href}
        onClick={onClick}
        _focus={{
          "& > *": { layerStyle: "focus" },
          boxShadow: "none",
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          p="4"
          bg={itemBg}
          borderRadius="16px"
          _hover={{ bg: itemHoverBg }}
        >
          {name} <ArrowForwardIcon />
        </Flex>
      </Link>
    </Skeleton>
  );
}

interface SearchResultProps<T> {
  getHref: (item: T) => string;
  items: T[];
  loading: boolean;
  name: string;
  onClick: () => void;
}

function SearchResult<T extends BasicRating | BlogpostBase>({
  name,
  items,
  getHref,
  loading,
  onClick,
}: SearchResultProps<T>): ReactElement {
  return (
    <Box m="4">
      <Text>{name}</Text>
      <Box overflow="auto" border="1px dashed" borderRadius="16px">
        {items?.map((item) => (
          <Item
            key={item._id}
            name={item.name}
            href={getHref(item)}
            loading={loading}
            onClick={onClick}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SearchResult;
