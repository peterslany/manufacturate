import { ReactElement } from "react";

interface Props {
  w?: any;
}

function Footer({ w = "a" }: Props): ReactElement {
  return (
    <div>
      FOOTER
      {w}
    </div>
  );
}

export default Footer;
