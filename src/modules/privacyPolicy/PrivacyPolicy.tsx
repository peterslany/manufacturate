import React, { ReactElement } from "react";
import { Head } from "../../components";
import { useLocale } from "../../hooks";

function PrivacyPolicy(): ReactElement {
  const { Message } = useLocale();
  return (
    <div>
      <Head
        title={Message.PRIVACY_POLICY}
        metaDescription={Message.META_PRIVACY_POLICY}
      />
    </div>
  );
}

export default PrivacyPolicy;
