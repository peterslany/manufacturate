import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { getBlogposts } from "../../api/db";
import { asLocale } from "../../api/utils";
import Blog from "../../modules/blog/Blog";
import { BlogpostsListData } from "../../types";

interface BlogPageProps {
  initialData: BlogpostsListData;
}

function BlogPage({ initialData }: BlogPageProps): ReactElement {
  return <Blog initialBlogposts={initialData} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const blogposts = await getBlogposts(asLocale(context.locale));

  return {
    props: { initialData: blogposts },
    revalidate: 60 * 60 * 6, // 6 hours,
  };
};

export default BlogPage;
