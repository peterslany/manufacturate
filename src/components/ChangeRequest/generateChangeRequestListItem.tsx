import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ContentType } from "../../constants";
import { useColorVariations, useLocale } from "../../hooks";
import { GeneralChangeRequest } from "../../types";
import { formatDateShort } from "../../utils";

export default function generateChangeRequestListItem(
  admin: boolean,
  handleOpenDeleteDialog: (changeRequest: GeneralChangeRequest) => void,
  handleOpenApprovalModal: (changeRequest: GeneralChangeRequest) => void,
  edit: (changeRequestId: string, contentType: ContentType) => void
): React.FC<GeneralChangeRequest> {
  const ChangeRequestListItem = (props: GeneralChangeRequest) => {
    const { Message, locale } = useLocale();

    const [red, blue, green, gray] = useColorVariations([
      "red",
      "blue",
      "green",
      "gray",
    ]);

    const {
      _id,
      content: { name },
      author,
      date,
      type,
    } = props;
    return (
      <Flex
        p="4"
        layerStyle="outline"
        justifyContent="space-between"
        align="center"
        direction={["column", "column", "row"]}
        mb="2"
      >
        {" "}
        <i>{type === ContentType.RATING ? Message.RATING : Message.BLOG}</i>
        <Flex
          px="2"
          w="full"
          justifyContent="space-between"
          wrap={["wrap", "wrap", "nowrap"]}
          align="center"
        >
          <Text fontWeight="600" w={["full", "50%"]} my="2">
            {name}
          </Text>{" "}
          <Text w={["auto", "25%"]} mr="2">
            {author}{" "}
          </Text>
          <Text
            textAlign="right"
            w={["auto", "13%"]}
            minW={["auto", "80px"]}
            mr="2"
            mb={["2", 0]}
          >
            {formatDateShort(date, locale)}
          </Text>
        </Flex>
        <Flex minW={admin ? "160px" : "100px"} justify="space-between">
          <IconButton
            aria-label="Delete change request"
            onClick={() => handleOpenDeleteDialog(props)}
            color={red.fg}
            layerStyle="outline"
            _hover={{ background: red.fg, color: gray.bg, borderColor: red.fg }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="Edit change request"
            onClick={() => edit(_id, type)}
            color={blue.fg}
            layerStyle="outline"
            _hover={{
              background: blue.fg,
              color: gray.bg,
              borderColor: blue.fg,
            }}
          >
            <EditIcon />
          </IconButton>
          {admin && (
            <IconButton
              layerStyle="outline"
              aria-label="Approve change request"
              onClick={() => handleOpenApprovalModal(props)}
              color={green.fg}
              _hover={{
                background: green.fg,
                color: gray.bg,
                borderColor: green.fg,
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
        </Flex>
      </Flex>
    );
  };
  return ChangeRequestListItem;
}
