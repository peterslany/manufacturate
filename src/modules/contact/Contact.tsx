import React, { ReactElement } from "react";
import { BasicPage, Head, Input } from "../../components";
import { useLocale } from "../../hooks";

function Contact(): ReactElement {
  const { Message } = useLocale();
  return (
    <BasicPage heading={Message.CONTACT_US}>
      <Head title={Message.CONTACT_US} metaDescription={Message.CONTACT_US} />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt in illum
      distinctio amet sequi corporis dolores neque harum repudiandae modi ut
      magni nesciunt assumenda ipsum, alias, optio quidem consequatur est?
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta doloremque
      consequatur voluptatum mollitia ullam reiciendis, aut odio asperiores esse
      a non quia. Voluptates numquam ratione laborum quasi nobis odio eos!
      <Input label="Email" name="email" type="email" />
    </BasicPage>
  );
}

export default Contact;
