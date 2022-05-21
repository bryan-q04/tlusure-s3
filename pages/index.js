import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ data }) {
  return (
    <div className="flex flex-col">
      {data.map((item) => {
        return (
          <Link href={"/pencarian-dan-pemesanan/" + item.path} key={path}>
            <a className="font-bold">{item.data.title}</a>
          </Link>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("pages/pencarian-dan-pemesanan/post");
  const data = files.map((filename) => {
    const path = filename.replace(".md", "");
    const markdownWithMetadata = fs
      .readFileSync("pages/pencarian-dan-pemesanan/post/" + path + ".md")
      .toString();
    const parsedMarkdown = matter(markdownWithMetadata).data;

    return {
      path: path,
      data: parsedMarkdown,
    };
  });

  return {
    props: {
      data: data,
    },
  };
};
