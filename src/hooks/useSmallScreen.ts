import { useEffect, useState } from "react";

const useSmallScreen = (): boolean => {
  const [isSmall, setIsSmall] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsSmall(window.innerWidth < 832);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return isSmall;
};

export default useSmallScreen;
