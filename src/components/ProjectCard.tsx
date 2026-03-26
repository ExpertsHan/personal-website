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
    <div className="group glass-card p-5">
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
      <h3 className="mb-2 text-lg font-semibold font-heading">{title}</h3>
      {description && (
        <p className="mb-3 text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tech-tag">
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
            className="text-sm text-accent transition-colors hover:text-accent-secondary"
          >
            查看專案 &rarr;
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
