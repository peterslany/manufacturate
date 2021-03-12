import { chakra, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Button from "../Button/Button";

interface PaginationProps {
  selectedPage: number;
  onPageChange: (n: number) => void;
  totalPages: number;
  className?: string;
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
    const bg = useColorModeValue(
      ["green.200", "green.300"],
      ["teal.700", "teal.600"]
    );
    return (
      <Button
        layerStyle="outline"
        borderRadius="50%"
        w={12}
        h={12}
        _hover={{ bg: bg[1] }}
        onClick={() => onPageChange(value)}
        m={0.5}
        fontWeight="400"
        {...(selectedPage === value && { bg: bg[0], fontWeight: 600 })}
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
          {selectedPage > 3 && " - - - "}
        </>
      )}
      {middlePages.map((pageNumber) => (
        <Page key={pageNumber} value={pageNumber} />
      ))}
      {renderLastPage && (
        <>
          {selectedPage < totalPages - 2 && " - - - "}
          <Page value={totalPages} />
        </>
      )}
    </Flex>
  );
}

export default chakra(Pagination);
