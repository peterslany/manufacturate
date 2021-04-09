import React, { ReactElement } from "react";
import { Head } from "../../components";
import { useLocale } from "../../hooks";

function Methodology(): ReactElement {
  const { Message } = useLocale();
  return (
    <div>
      <Head
        title={Message.METHODOLOGY}
        metaDescription={Message.META_METHODOLOGY}
      />
    </div>
  );
}

export default Methodology;
