import type { Metadata } from "next";
import { getPosts } from "@/lib/sanity/queries";
import BlogPostCard from "@/components/BlogPostCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "部落格",
  description: "我的部落格文章，分享技術心得和學習筆記。",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold font-heading">部落格</h1>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {posts.map((post: any) => (
            <BlogPostCard key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">
          尚未發布文章。請前往 /studio 新增。
        </p>
      )}
    </div>
  );
}
