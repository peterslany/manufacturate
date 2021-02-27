import { useBreakpointValue } from "@chakra-ui/react";

const useSmallScreen = (): boolean =>
  Boolean(useBreakpointValue({ base: true, md: false }));

export default useSmallScreen;
