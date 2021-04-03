import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { getRatingsList } from "../../api/db";
import Ratings from "../../modules/ratings";
import { BasicRating, ListData } from "../../types";

interface Props {
  initialRatingsData: ListData<BasicRating>;
}

function RatingsPage({ initialRatingsData }: Props): ReactElement {
  return <Ratings initialRatingsData={initialRatingsData} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const ratings = await getRatingsList();

  return {
    props: { initialRatingsData: ratings },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
export default RatingsPage;
