import React, { ReactElement } from "react";
import { Head } from "../../components";
import { useLocale } from "../../hooks";

interface Props {}

function Contact({}: Props): ReactElement {
  const { Message } = useLocale();
  return (
    <div>
      <Head title={Message.CONTACT_US} metaDescription={Message.CONTACT_US} />
    </div>
  );
}

export default Contact;
