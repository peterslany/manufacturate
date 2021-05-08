import { Box, Divider, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { debounce } from "lodash";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Input, Pagination } from "..";
import { ApiUrl, PAGE_SIZE, SortOrder } from "../../constants";
import { useGet, useLocale } from "../../hooks";
import Select from "../Select";
import { getUrlEndpoint } from "./utils";

interface InputConfig {
  label: string;
  name: string;
}

export type ItemsListRef<T> = React.RefObject<{
  modifyItems: (modification: (current: T[]) => T[]) => void;
}>;

interface Props<T> {
  Item: React.FC<T>;
  all?: boolean;
  dateSort?: boolean;
  heading?: string;
  inputConfig?: InputConfig;
  inputRef: ItemsListRef<T>;
  itemsEndpoint?: ApiUrl;
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
  all,
}: Props<T>): ReactElement {
  const { Message } = useLocale();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESCENDING);

  const url = useMemo(
    () =>
      itemsEndpoint &&
      getUrlEndpoint(
        itemsEndpoint,
        searchQuery,
        selectedPage,
        dateSort,
        sortOrder,
        all
      ),
    [all, dateSort, itemsEndpoint, searchQuery, selectedPage, sortOrder]
  );

  const { data, loading } = useGet<{ count: number; items: T[] }>(url);

  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (data?.items) {
      setItems(data.items);
    }
  }, [data]);

  const modifyItems = useCallback(
    (modification: (current: T[]) => T[]) => setItems(modification),
    [setItems]
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
        <Flex mb="4" align="center" justify="flex-start">
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
      {loading && (
        <Progress
          size="xs"
          colorScheme="blue"
          isIndeterminate
          bg="transparent"
        />
      )}
      <Box opacity={loading ? 0.6 : 1}>
        {items.map((props: T) => (
          <Item
            key={((props as unknown) as Record<string, string>)[keyField]}
            {...props}
          />
        ))}
        <em>{items.length < 1 && Message.NO_ITEMS}</em>
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

export default ItemsList;
