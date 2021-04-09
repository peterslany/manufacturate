import React, { ReactElement } from "react";
import { Head } from "../../components";
import { useLocale } from "../../hooks";

function About(): ReactElement {
  const { Message } = useLocale();
  return (
    <div>
      <Head title={Message.ABOUT} metaDescription={Message.META_ABOUT} />
      About
    </div>
  );
}

export default About;
