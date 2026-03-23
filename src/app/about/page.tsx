import type { Metadata } from "next";
import Image from "next/image";
import { getAbout } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const metadata: Metadata = {
  title: "關於我",
  description: "了解更多關於我的背景、技能和經歷。",
};

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center text-gray-400">
        <p>尚未新增「關於我」的內容。請前往 /studio 編輯。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold">
        {about.heading || "關於我"}
      </h1>

      <div className="flex flex-col gap-12 sm:flex-row">
        {about.profileImage && (
          <div className="shrink-0">
            <Image
              src={urlFor(about.profileImage).width(240).height(240).url()}
              alt="個人照片"
              width={240}
              height={240}
              className="rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          {about.bio && <PortableTextRenderer value={about.bio} />}
        </div>
      </div>

      {about.skills && about.skills.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">技能</h2>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill: string) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {(about.email || about.socialLinks?.length > 0) && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">聯絡方式</h2>
          <div className="flex flex-wrap gap-4">
            {about.email && (
              <a
                href={`mailto:${about.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {about.email}
              </a>
            )}
            {about.socialLinks?.map(
              (link: { platform: string; url: string }) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.platform}
                </a>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
