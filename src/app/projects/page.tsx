import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity/queries";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "專案作品",
  description: "我的專案作品集，包含各類技術專案。",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold font-heading">專案作品</h1>

      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {projects.map((project: any) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">
          尚未新增專案。請前往 /studio 新增。
        </p>
      )}
    </div>
  );
}
