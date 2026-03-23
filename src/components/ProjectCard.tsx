import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

interface ProjectCardProps {
  title: string;
  description?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  tags?: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  mainImage,
  tags,
  projectUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-gray-100 p-5 transition-shadow hover:shadow-md">
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
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mb-3 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            查看專案 &rarr;
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
