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
  // generate static page with initial data, so ratings data are already present on first render
  return {
    props: { initialRatingsData: ratings },
    revalidate: 60 * 10, // 10 minutes
  };
};

export default RatingsPage;
