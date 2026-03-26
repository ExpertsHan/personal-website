import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

interface BlogPostCardProps {
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
}

export default function BlogPostCard({
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug.current}`}
      className="group block glass-card p-5"
    >
      {mainImage?.asset && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={urlFor(mainImage).width(600).height(340).url()}
            alt={mainImage.alt || title}
            width={600}
            height={340}
            className="w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold font-heading group-hover:text-accent">
        {title}
      </h3>
      {publishedAt && (
        <time className="mb-2 block text-sm text-muted">
          {new Date(publishedAt).toLocaleDateString("zh-TW")}
        </time>
      )}
      {excerpt && (
        <p className="text-sm leading-relaxed text-muted">{excerpt}</p>
      )}
    </Link>
  );
}
