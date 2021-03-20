import { Box, chakra, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Button } from "..";

interface PaginationProps {
  className?: string;
  onPageChange: (n: number) => void;
  selectedPage: number;
  totalPages: number;
}

interface PageProps {
  value: number;
}

function Pagination({
  selectedPage,
  onPageChange,
  totalPages,
  className,
}: PaginationProps): ReactElement {
  const renderFirstPage = selectedPage - 1 > 1;
  const renderLastPage = selectedPage + 1 < totalPages;
  const middlePages = [selectedPage - 1, selectedPage, selectedPage + 1].filter(
    (pageNumber) => pageNumber >= 1 && pageNumber <= totalPages
  );

  function Page({ value }: PageProps) {
    const hoverColor = useColorModeValue(
      ["black", "white"],
      ["white", "black"]
    );
    return (
      <Button
        layerStyle="outline"
        borderRadius="50%"
        border="1px dashed"
        w={[10, 12]}
        h={[10, 12]}
        onClick={() => onPageChange(value)}
        mx={[0.5, 1.5]}
        fontWeight="600"
        {...(selectedPage === value && {
          bg: hoverColor[0],
          color: hoverColor[1],
          border: "none",
        })}
        _hover={{
          border: "1px solid",
          background: "transparent",
          color: "inherit",
        }}
        className={className}
      >
        {value}
      </Button>
    );
  }

  return (
    <Flex align="baseline">
      {renderFirstPage && (
        <>
          <Page value={1} />
          {selectedPage > 3 && <Box mx={[1, 2]}> - </Box>}
        </>
      )}
      {middlePages.map((pageNumber) => (
        <Page key={pageNumber} value={pageNumber} />
      ))}
      {renderLastPage && (
        <>
          {selectedPage < totalPages - 2 && <Box mx={[1, 2]}> - </Box>}
          <Page value={totalPages} />
        </>
      )}
    </Flex>
  );
}

export default chakra(Pagination);
