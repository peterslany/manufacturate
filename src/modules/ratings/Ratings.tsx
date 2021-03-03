import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Filters from "../../components/Filters";
import Searchbar from "../../components/Searchbar";

interface Props {}

function Ratings({}: Props): ReactElement {
  //   const isSmallerScreen = useSmallScreen();

  //   const FilterContainer = FiltersModal;
  const sidebarBg = useColorModeValue("gray.900A10", "gray.50A10");
  return (
    <Flex>
      <Box
        p={2}
        pl={4}
        bg={sidebarBg}
        height="660px"
        width="280px"
        borderBottomRightRadius="420px"
      >
        <Filters />
      </Box>
      <div>
        <Searchbar
          m={10}
          showFullSearchbar
          borderWidth={2}
          totalWidth={["220px", "420px"]}
        />
        <Box m={10}>Zvolene filtre: .....</Box>
        <div> Vypis</div>
      </div>
    </Flex>
  );
}

export default Ratings;
