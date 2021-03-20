import { useBreakpointValue } from "@chakra-ui/react";

const useSmallScreen = (): boolean =>
  Boolean(useBreakpointValue({ base: true, md: false }) ?? true);

export default useSmallScreen;
