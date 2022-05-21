import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { marked } from "marked";

const Post = ({ htmlStrings, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        <div dangerouslySetInnerHTML={{ __html: htmlStrings }} />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("pages/pencarian-dan-pemesanan/post");
  console.log("files:", files);
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  console.log("paths:", paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("pages/pencarian-dan-pemesanan/post", slug + ".md"))
    .toString();
  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlStrings = marked(parsedMarkdown.content);

  return {
    props: {
      htmlStrings,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
