import React, { ReactElement } from "react";
import { BasicPage, Head } from "../../components";
import { useLocale } from "../../hooks";

function PrivacyPolicy(): ReactElement {
  const { Message } = useLocale();
  return (
    <BasicPage heading={Message.PRIVACY_POLICY}>
      <Head
        title={Message.PRIVACY_POLICY}
        metaDescription={Message.META_PRIVACY_POLICY}
      />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
      voluptate non consequuntur nesciunt doloremque, est tenetur odio placeat
      numquam maxime sint? Doloremque molestias beatae quos consectetur possimus
      ipsa suscipit totam.
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatem
      perspiciatis accusantium autem ullam ipsa fuga hic esse dicta minima
      nostrum facere, asperiores velit porro quis recusandae aliquam eveniet.
      Neque. Velit, fugiat? Nemo quo, fugit amet corrupti, eum itaque maiores
      adipisci, rerum quibusdam quasi aliquid ad expedita necessitatibus tempore
      dolor blanditiis consequuntur. Nobis, pariatur eius maiores officiis
      tenetur distinctio ab. Omnis voluptas quisquam obcaecati ut maxime numquam
      provident quidem fugit reiciendis, praesentium nostrum dicta ea totam
      dolorum modi debitis ipsam eaque saepe deserunt blanditiis ipsum quasi?
      Nemo nam at ratione!
      <br />
      <br />
      <strong>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
        quisquam quod perferendis eaque neque, ipsa sequi sapiente iusto saepe
        consequuntur non iste explicabo ad alias nostrum beatae blanditiis.
        Quae, provident?
      </strong>
    </BasicPage>
  );
}

export default PrivacyPolicy;
