import { ReactElement } from "react";
import RatingsModule from "../../modules/ratings";

interface Props {}
// export const getStaticProps: GetStaticProps = async (context) => ({
//   props: {},
// });

function Ratings({}: Props): ReactElement {
  // TODO get initial data in getstatic props
  return <RatingsModule initialRatingsData={[]} />;
}

export default Ratings;
