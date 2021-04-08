import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { ReactElement } from "react";
import { getAllRatingsIds, getRatingDetail } from "../../api/db";
import { asLocale, localizeRatingData } from "../../api/utils";
import { LoadingFallback } from "../../components";
import RatingDetail from "../../modules/ratings/RatingDetail";
import { RatingLocalized } from "../../types/ratings";
import { parseString } from "../../utils";

interface Props {
  data: RatingLocalized;
}

function RatingDetailPage({ data }: Props): ReactElement {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <LoadingFallback />;
  }
  return <RatingDetail data={data} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context?.params?.name;
  const locale = context?.locale;

  const fullRatingData = await getRatingDetail(parseString(name));

  if (!fullRatingData) {
    return {
      notFound: true,
    };
  }

  const data = localizeRatingData(fullRatingData, asLocale(locale));

  return {
    props: { data },
    revalidate: 60 * 15, // 15 minutes
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { locales } = context;

  const allRatings = await getAllRatingsIds();

  const paths = allRatings.reduce(
    (result, { _id }) => [
      ...result,
      ...(locales || []).map((locale) => ({ params: { name: _id }, locale })),
    ],
    [] as { locale: string; params: ParsedUrlQuery }[]
  );

  return {
    paths,
    fallback: true,
  };
};
export default RatingDetailPage;
