import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useAlert = (
  variant: "error" | "success"
): ((message: string) => void) => {
  const toast = useToast();

  const showAlert = useCallback((message: string) => {
    toast({
      title: message,
      status: variant,
      isClosable: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showAlert;
};

export default useAlert;
