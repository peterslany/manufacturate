import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { debounce } from "lodash";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Input, Pagination } from "..";
import { ApiUrl, PAGE_SIZE, SortOrder } from "../../constants";
import { useGet, useLocale } from "../../hooks";
import Select from "../Select";

interface InputConfig {
  label: string;
  name: string;
}

export type ItemsListRef<T> = React.RefObject<{
  modifyItems: (modification: (current: T[]) => T[]) => void;
}>;

interface Props<T> {
  Item: React.FC<T>;
  dateSort?: boolean;
  heading?: string;
  inputConfig?: InputConfig;
  inputRef: ItemsListRef<T>;
  itemsEndpoint: ApiUrl | string;
  keyField: string;
}
function ItemsList<T>({
  heading,
  itemsEndpoint,
  inputConfig,
  Item,
  inputRef,
  keyField,
  dateSort,
}: Props<T>): ReactElement {
  const { Message } = useLocale();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESCENDING);

  const url = `${itemsEndpoint}?${
    searchQuery ? `search=${searchQuery}&` : ""
  }page=${selectedPage}&${
    dateSort ? `sortBy=date&sortOrder=${sortOrder}` : ""
  }`;

  const { data, loading } = useGet<{ count: number; items: T[] }>(url);

  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (data?.items) {
      setItems(data.items);
    }
  }, [data]);

  const modifyItems = useCallback(
    (modification: (current: T[]) => T[]) => setItems(modification),
    []
  );

  useImperativeHandle(
    inputRef,
    () => ({
      modifyItems,
    }),
    [modifyItems]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce((newValue: string) => {
      setSelectedPage(1);
      setTimeout(() => setSearchQuery(newValue));
    }, 350),
    []
  );

  return (
    <>
      {heading && (
        <Heading size="md" pb="2" mb="2" borderBottom="1px solid">
          {heading}
        </Heading>
      )}
      {inputConfig && (
        <>
          <Input
            label={inputConfig.label}
            onChange={handleInputChange}
            name={inputConfig.name}
            type="text"
          />
          <Divider my="4" />
        </>
      )}
      {dateSort && (
        <Flex mb="4" align="center" justify="flex-end">
          <Text fontWeight="600" mr="2">
            {Message.SORTED_BY_DATE}
          </Text>
          <Select
            options={[
              { label: Message.ASCENDING, value: SortOrder.ASCENDING },
              { label: Message.DESCENDING, value: SortOrder.DESCENDING },
            ]}
            onChange={setSortOrder}
            value={sortOrder}
            name={Message.SORT_ORDER}
          />{" "}
        </Flex>
      )}
      <Box opacity={loading ? 0.6 : 1}>
        {items.map((props: T) => (
          <Item
            key={((props as unknown) as Record<string, string>)[keyField]}
            {...props}
          />
        ))}

        <Pagination
          mt="2"
          totalPages={Math.ceil((data?.count || 0) / PAGE_SIZE)}
          selectedPage={selectedPage}
          onPageChange={setSelectedPage}
        />
      </Box>
    </>
  );
}

export default ItemsList; // <T extends unknown> () => forwardRef<unknown, Props>(() => ItemsList<T>());
