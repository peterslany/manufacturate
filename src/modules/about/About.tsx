import React, { ReactElement } from "react";
import { BasicPage, Head } from "../../components";
import { useLocale } from "../../hooks";

function About(): ReactElement {
  const { Message } = useLocale();
  return (
    <BasicPage heading={Message.ABOUT}>
      <Head title={Message.ABOUT} metaDescription={Message.META_ABOUT} />
      {Message.META_ABOUT} <br /> <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
      incidunt facilis debitis harum quam? Nesciunt dicta eos odit obcaecati ex
      laborum, consequuntur nostrum non in tempore similique, cumque assumenda
      asperiores. Saepe accusamus magnam iusto sit optio veritatis esse
      corporis? Voluptatem eligendi molestiae error consequuntur! Architecto
      quaerat nesciunt neque, eligendi sapiente perspiciatis, mollitia veritatis
      obcaecati culpa nulla iure fugit voluptatum ratione? Nobis laudantium
      ipsam reiciendis deserunt optio minima consectetur vero quam officia
      itaque nesciunt molestias, inventore magni odio sapiente aliquid impedit,
      error, dolore nam exercitationem laborum? Atque quia ullam sunt cum!
      Culpa, natus doloribus eaque pariatur amet vel consequatur autem ab
      reiciendis repellat distinctio nihil porro molestias. Earum, laudantium
      dolores necessitatibus iste sapiente atque distinctio repellat nihil, in
      optio, harum sequi? Consequatur ab voluptatem, totam aliquid maiores iure
      nam distinctio veritatis dicta nihil illo alias in aliquam nobis explicabo
      architecto nisi dolores saepe eligendi consequuntur vel ullam repellendus
      veniam. Nisi, dolorum?{" "}
    </BasicPage>
  );
}

export default About;
