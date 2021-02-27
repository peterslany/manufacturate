import { GetStaticProps } from "next";
import { ReactElement } from "react";

interface Props {}
export const getStaticProps: GetStaticProps = async (context) => ({
  props: {},
});

function Ratings({}: Props): ReactElement {
  return <div>Ratings</div>;
}

export default Ratings;
