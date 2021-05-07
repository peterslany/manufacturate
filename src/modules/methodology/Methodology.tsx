import React, { ReactElement } from "react";
import { BasicPage, Head } from "../../components";
import { useLocale } from "../../hooks";

function Methodology(): ReactElement {
  const { Message } = useLocale();
  return (
    <BasicPage heading={Message.METHODOLOGY}>
      <Head
        title={Message.METHODOLOGY}
        metaDescription={Message.META_METHODOLOGY}
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maiores,
      alias eveniet deserunt obcaecati reiciendis ratione assumenda, explicabo
      harum voluptatem illum impedit fugiat tenetur distinctio iure officia,
      eligendi blanditiis autem. Tempore ipsam possimus sit animi voluptas,
      repellendus, atque culpa vel molestias molestiae magnam quasi sapiente
      beatae, tenetur sint similique. Tempore iusto dolorum quam tenetur labore
      voluptates quas minus nobis consectetur!
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia adipisci
      odit minus corrupti laudantium sed soluta illo. Delectus, nobis natus, et
      voluptate voluptas beatae tenetur eius ratione repellendus, ipsum
      exercitationem. Omnis expedita optio molestiae quo in ipsam culpa eius
      nostrum, sequi perferendis labore explicabo officia eligendi unde amet
      error perspiciatis voluptates placeat repellat ex quidem illum
      consequuntur? Esse, iusto ex! Illo a cumque molestias, veniam aperiam
      repudiandae qui, consequatur et minima maxime earum ab deleniti quisquam,
      consectetur tempora mollitia natus accusantium labore? Quos repellat
      deserunt explicabo aspernatur at corporis debitis!
      <br />
      <br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae eius iure
      provident ea, quam neque, quod exercitationem incidunt corrupti dolorum
      harum facilis doloribus nisi saepe, repellendus aliquid voluptatem
      asperiores inventore.
    </BasicPage>
  );
}

export default Methodology;
