import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { getAllBlogpostsUrls, getBlogpost } from "../../api/db";
import { asLocale } from "../../api/utils";
import { LoadingFallback } from "../../components";
import FullBlogpost from "../../modules/blog/FullBlogpost";
import { Blogpost } from "../../types";
import { generateBlogpostId, parseString } from "../../utils";

interface Props {
  data: Blogpost;
}

function BlogpostPage({ data }: Props): ReactElement {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <LoadingFallback />;
  }
  return <FullBlogpost data={data} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = asLocale(context.locale);
  const _id = context.params?.slug;

  const data = await getBlogpost(
    generateBlogpostId(locale, parseString(_id) || "")
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 60 * 15, // 15 minutes
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogposts = await getAllBlogpostsUrls();

  const paths = allBlogposts.map(({ urlPathSegment, locale }) => ({
    params: { slug: urlPathSegment },
    locale,
  }));

  return {
    paths,
    fallback: true,
  };
};

export default BlogpostPage;
