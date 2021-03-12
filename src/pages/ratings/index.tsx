import { ReactElement } from "react";
import RatingsModule from "../../modules/ratings";

interface Props {}
// export const getStaticProps: GetStaticProps = async (context) => ({
//   props: {},
// });

function Ratings({}: Props): ReactElement {
  return <RatingsModule />;
}

export default Ratings;