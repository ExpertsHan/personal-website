import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        &larr; 返回部落格
      </Link>

      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>

      {post.publishedAt && (
        <time className="mb-8 block text-sm text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
        </time>
      )}

      {post.mainImage?.asset && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <Image
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.mainImage.alt || post.title}
            width={800}
            height={450}
            className="w-full object-cover"
          />
        </div>
      )}

      {post.body && (
        <div className="prose-custom">
          <PortableTextRenderer value={post.body} />
        </div>
      )}
    </article>
  );
}
