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
      className="group block rounded-xl border border-gray-100 p-5 transition-shadow hover:shadow-md"
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
      <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">
        {title}
      </h3>
      {publishedAt && (
        <time className="mb-2 block text-sm text-gray-400">
          {new Date(publishedAt).toLocaleDateString("zh-TW")}
        </time>
      )}
      {excerpt && (
        <p className="text-sm leading-relaxed text-gray-600">{excerpt}</p>
      )}
    </Link>
  );
}
