import Link from "next/link";
import { getHomeData } from "@/lib/sanity/queries";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";

export const revalidate = 60;

export default async function HomePage() {
  const { projects, posts } = await getHomeData();

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight font-heading sm:text-5xl">
          你好，我是 <span className="gradient-text">一笑落塵</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted">
          歡迎來到我的個人網站。這裡記錄了我的專案作品和學習心得。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/projects" className="btn-gradient">
            查看作品
          </Link>
          <Link href="/about" className="btn-ghost">
            認識我
          </Link>
        </div>
      </section>

      {/* 最新專案 */}
      {projects.length > 0 && (
        <section className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-heading">精選專案</h2>
            <Link
              href="/projects"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {projects.map((project: any) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        </section>
      )}

      {/* 最新文章 */}
      {posts.length > 0 && (
        <section className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-heading">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts.map((post: any) => (
              <BlogPostCard key={post._id} {...post} />
            ))}
          </div>
        </section>
      )}

      {/* 沒有內容時的提示 */}
      {projects.length === 0 && posts.length === 0 && (
        <section className="py-12 text-center text-muted">
          <p>
            尚未新增內容。請前往{" "}
            <Link href="/studio" className="text-accent underline">
              /studio
            </Link>{" "}
            新增你的專案和文章。
          </p>
        </section>
      )}
    </div>
  );
}
