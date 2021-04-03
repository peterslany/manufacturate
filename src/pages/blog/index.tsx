import React, { ReactElement } from "react";

interface Props {}

function Blog({}: Props): ReactElement {
  return (
    <div>
      - blog1
      <br />- blog2
    </div>
  );
}

export default Blog;
